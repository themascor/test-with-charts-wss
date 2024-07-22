import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './page-404.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page404Component { }
