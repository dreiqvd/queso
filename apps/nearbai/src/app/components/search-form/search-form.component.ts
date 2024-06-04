import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

import { PlatformService } from '@queso/common/services';
import { SelectableItem } from '@queso/ui-kit';
import { SelectComponent } from '@queso/ui-kit/select';

import { Origin, SearchParams } from '../../app.interface';
import { SearchService } from '../../services/search.service';

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
export class SearchFormComponent implements OnInit {
  readonly searchForm = new FormGroup({
    origin: new FormControl<string>(DEFAULTS['origin']),
    category: new FormControl<string>(DEFAULTS['category']),
    radius: new FormControl<number>(DEFAULTS['radius']),
  });

  /** Dropdown Options */
  readonly sourceLocations: Origin[] = ORIGINS;
  readonly categories: SelectableItem[] = CATEGORIES;
  readonly radiusOptions: SelectableItem[] = RADIUS;

  readonly buttonLabel = signal<string>('Find');

  // Dependency Services
  private readonly platformService = inject(PlatformService);
  private readonly searchService = inject(SearchService);

  ngOnInit(): void {
    this.checkGeolocation();

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
      this.platformService.isUsingBrowser &&
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
