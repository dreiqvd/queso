import { Component } from '@angular/core';
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
export class InputComponent extends GenericFormFieldDirective {}
