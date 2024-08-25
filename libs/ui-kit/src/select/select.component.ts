import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

import { QsGenericFormFieldDirective, QsSelectableItem } from '../core';

@Component({
  selector: 'qs-select',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelect, MatOption],
  templateUrl: './select.component.html',
  styles: `
    :host {
      width: 100%;
    }
  `,
})
export class QsSelectComponent extends QsGenericFormFieldDirective {
  readonly options = input.required<QsSelectableItem[]>();
}
