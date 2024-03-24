import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GenericFormFieldDirective } from '../../directives/generic-field.directive';

@Component({
  selector: 'qs-textarea',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent extends GenericFormFieldDirective {
  /** The number of rows to display in the textarea.
   * @defaultValue 5
   */
  rows = input<number>(5);

  /**
   * Applies the value on the native HTML attribute `autocomplete` to the textarea.
   */
  autocomplete = input<'on' | 'off'>('on');
}
