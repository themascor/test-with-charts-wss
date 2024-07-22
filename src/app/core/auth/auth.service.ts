import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { TokenResponse } from '../http/types/token-response';
import { API_VERSION_TOKEN } from '../http/api-version/api-version-token';
import { SKIP_AUTH_HTTP_CONTEXT } from '../http/interceptors/http-context/skip-auth.http-context';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../routing/paths.type';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiVersion = inject(API_VERSION_TOKEN).main;
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly _token$ = new BehaviorSubject<string | null>(this.getToken()?.access_token || null);

  public get token(): TokenResponse | null {
    return this.getToken();
  }

  public get token$(): Observable<string | null> {
    return  this._token$.pipe(distinctUntilChanged());
  }

  private baseHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );

  constructor() {}

  login(): Observable<TokenResponse | null> {
    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: 'app-cli',
      username: env.USERNAME,
      password: env.PASSWORD,
    });
    return this.http
      .post<TokenResponse | null>(
        `${env.URI}/${this.apiVersion}/identity/realms/fintatech/protocol/openid-connect/token`,
        body.toString(),
        {
          headers: this.baseHeaders,
          context: new HttpContext().set(SKIP_AUTH_HTTP_CONTEXT, true),
        }
      )
      .pipe(tap((resp) => this.setToken(resp)));
  }

  regTicker(ticker: Observable<void>) {
    ticker.subscribe((_) => this.onTick());
  }
  
  private onTick() {
    this.checkTokenExpires();
  }

  private setToken(tokenResponse: TokenResponse | null) {
    if (tokenResponse) {
      const expireTime = new Date().getTime() + tokenResponse.expires_in * 1000;
      sessionStorage.setItem('tokenResponse', JSON.stringify(tokenResponse));
      sessionStorage.setItem('expires_at', expireTime + '');
    } else {
      sessionStorage.removeItem('tokenResponse');
      sessionStorage.removeItem('expires_at');
    }
    this._token$.next(tokenResponse?.access_token || null)
  }

  private getToken(): TokenResponse | null {
    const tokenResponse = sessionStorage.getItem('tokenResponse');
    return tokenResponse ? JSON.parse(tokenResponse) : null;
  }

  private checkTokenExpires() {
    if (!this.token) {
      return;
    }
    const expiresAt = parseInt(sessionStorage.getItem('expires_at') || '0');
    const now = new Date().getTime();
    const expiresIn = expiresAt - now;
    if (expiresIn < 30000) {
      this.setToken(null);
      this.router.navigate([ROUTER_PATHS.login.root]);
    }
  }
}
