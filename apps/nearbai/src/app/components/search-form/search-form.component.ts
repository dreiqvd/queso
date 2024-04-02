import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

import { SelectableItem } from '@queso/ui-kit';
import { SelectComponent } from '@queso/ui-kit/select';

import { CATEGORIES, DEFAULTS, ORIGINS, RADIUS } from './search-form.data';

@Component({
  selector: 'qs-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, SelectComponent],
  templateUrl: './search-form.component.html',
  styles: `
    .search-btn {
      --mdc-filled-button-label-text-size: 1rem;
      --mdc-filled-button-container-height: 56px;
    }
  `,
})
export class SearchFormComponent {
  /** List of fixed source locations */
  readonly sourceLocations: SelectableItem[] = ORIGINS;
  readonly categories: SelectableItem[] = CATEGORIES;
  readonly radiusOptions: SelectableItem[] = RADIUS;

  readonly searchForm = new FormGroup({
    origin: new FormControl(DEFAULTS['origin']),
    category: new FormControl(DEFAULTS['category']),
    radius: new FormControl(DEFAULTS['radius']),
  });
}
