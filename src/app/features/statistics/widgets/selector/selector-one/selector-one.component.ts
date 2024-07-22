import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSelectorWidget } from '../models/abstract-selector-widget';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-selector-one',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    NgFor,
  ],
  templateUrl: './selector-one.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorOneComponent extends AbstractSelectorWidget {
  
}
