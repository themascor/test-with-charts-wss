import { inject } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { AuthService } from '../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { E } from '@angular/cdk/keycodes';

export abstract class WssAbstract<Response, Message> {
  protected abstract readonly url: string;
  private readonly auth = inject(AuthService);

  protected readonly _response$ = new Subject<Response | null>();
  private activeSocket: Subject<any> | null = null;
  private lastMessage: Message | null = null;

  public get response$(): Observable<Response | null> {
    return this._response$.asObservable();
  }

  protected get isConnected(): boolean {
    return !!this.activeSocket;
  }

  constructor() {
    this.auth.token$
      .pipe(takeUntilDestroyed())
      .subscribe((token) => this.atTokenUpdates(token));
  }

  protected init(){
    if (this.isConnected) {
      return;
    }
    if (!this.auth.token?.access_token ) { throw new Error('Cant init WSS without access token;')}
    this.rebuild(this.auth.token?.access_token);
    this.connect()
  }
  protected sendMessage(msg: Message | null) {
    this.lastMessage = msg;
    if (!msg) {
      return;
    }
    this.activeSocket?.next(msg);
  }
  private connect(msg?: Message | null) {
    this.activeSocket?.subscribe({
      next: (response) => {
        //console.log('SOCKET_RESPONSE: ', response);
        this._response$.next(response);
      },
      error: (err) => console.log('SOCKET_ERROR: ', err, this.disconnect()),
      complete: () => {
        console.log('SOCKET_DISCONNECTED');
        this.disconnect();
      },
    });
    if (msg) {
      this.sendMessage(msg);
    }
  }
  private reconnect(token: string, msg?: Message | null) {
    this.disconnect(msg);
    this.rebuild(token);
    this.connect(msg);
  }

  private disconnect(msg?: Message | null) {
    if (msg) {
      this.sendMessage(msg);
    }
    this.activeSocket?.complete();
    this.activeSocket = null;
  }

  private rebuild(token: string) {
    this.activeSocket = this.buildSocket(token);
  }



  private buildSocket(token: string): Subject<any> {
    return webSocket(`${this.url}?token=${token}`);
  }

  private atTokenUpdates(token: string | null) {
    if (!token) {
      this.disconnect();
    } else if (!!this.activeSocket) {
      this.reconnect(token, this.lastMessage);
    }
  }
}
