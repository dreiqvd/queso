import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GenericFormFieldDirective } from '../../directives/generic-field.directive';

@Component({
  selector: 'qs-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
})
export class InputComponent extends GenericFormFieldDirective {
  /**
   * Applies the value of the native HTML attribute `autocomplete` to the input element.
   */
  autocomplete = input<'on' | 'off'>('on');
}
