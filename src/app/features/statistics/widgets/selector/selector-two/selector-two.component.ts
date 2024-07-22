import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractSelectorWidget } from '../models/abstract-selector-widget';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-selector-two',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    NgFor,
    MatIcon
  ],
  templateUrl: './selector-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorTwoComponent extends AbstractSelectorWidget { }
