import { Component, Input } from '@angular/core';
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
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent extends GenericFormFieldDirective {
  /** The number of rows to display in the textarea.
   * @defaultValue 5
   */
  @Input() rows = 5;
}
