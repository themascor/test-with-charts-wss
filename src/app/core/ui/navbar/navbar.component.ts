import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingIndicatorService } from '../services/loading-indicator.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBar,
    NgIf,
  ],
  template: `<mat-toolbar class="flex justify-between px-20">
   
          <mat-icon>person</mat-icon>
       
      <span>Andrii Maistruk</span>
      <div>
        
        <a mat-raised-button href="mailto:loginwizard@gmail.com" target="_blank"><mat-icon>outgoing_mail</mat-icon> Send me email</a>
        <a mat-raised-button href="https://t.me/themascor" target="_blank"><mat-icon>send</mat-icon>Contact me via Telegram</a>
        <a mat-raised-button href="https://www.linkedin.com/in/maistruk/" target="_blank"><mat-icon>account_box</mat-icon>LinkedIn</a>
          
      </div>
    </mat-toolbar>
    <div class="min-h-3">
      <mat-progress-bar
      *ngIf="loading()"
      mode="indeterminate"
      ></mat-progress-bar>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  
  public loading: Signal<boolean> = inject(LoadingIndicatorService).loading;
  constructor() {
    
  }
}
