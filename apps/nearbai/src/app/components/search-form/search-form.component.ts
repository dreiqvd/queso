import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { QsSelectableItem } from '@queso/ui-kit/core';
import { QsFormFieldDirective } from '@queso/ui-kit/form-field';

import { Origin, SearchParams } from '../../core/interfaces';
import { SearchService } from '../../services';

import { CATEGORIES, DEFAULTS, ORIGINS, RADIUS } from './search-form.data';

@Component({
  selector: 'app-search-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    QsFormFieldDirective,
  ],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit {
  // Dependencies
  private readonly searchService = inject(SearchService);

  // Form
  readonly searchForm = new FormGroup({
    origin: new FormControl<string>(DEFAULTS['origin']),
    category: new FormControl<string>(DEFAULTS['category']),
    radius: new FormControl<number>(DEFAULTS['radius']),
  });

  // Dropdown options
  readonly sourceLocations: Origin[] = ORIGINS;
  readonly categories: QsSelectableItem[] = CATEGORIES;
  readonly radiusOptions: QsSelectableItem[] = RADIUS;

  // Misc
  readonly buttonLabel = signal<string>('Find');

  constructor() {
    afterNextRender(() => this.checkGeolocation(), {
      phase: AfterRenderPhase.Read,
    });
  }

  ngOnInit(): void {
    const { category } = this.searchForm.controls;
    category.valueChanges.subscribe((value) => {
      this.handleCategoryChange(value as string);
    });

    this.handleCategoryChange(category.value as string);
  }

  /** Handles event when category selection has been changed */
  private handleCategoryChange(value: string): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const label = this.categories.find((c) => c.value === value)!
      .label as string;

    this.buttonLabel.set(`Find ${label}`);
  }

  /** Verify if Geolocation feature is availabel */
  private checkGeolocation(): void {
    if (
      navigator.geolocation &&
      !this.sourceLocations.find((l) => l.value === 'current')
    ) {
      // Insert Current Location in the list of options
      this.sourceLocations.unshift({
        label: 'Current Location',
        value: 'current',
      });
    }
  }

  onSearch(): void {
    this.searchService.search(this.searchForm.value as SearchParams);
  }
}
