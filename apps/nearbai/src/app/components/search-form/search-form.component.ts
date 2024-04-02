import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
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
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter<SearchValue>();

  readonly searchForm = new FormGroup({
    origin: new FormControl<string>(DEFAULTS['origin']),
    category: new FormControl<string>(DEFAULTS['category']),
    radius: new FormControl<number>(DEFAULTS['radius']),
  });

  /** Dropdown Options */
  readonly sourceLocations: SelectableItem[] = ORIGINS;
  readonly categories: SelectableItem[] = CATEGORIES;
  readonly radiusOptions: SelectableItem[] = RADIUS;

  readonly buttonLabel = signal<string>('Find');

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

  onSearch(): void {
    this.search.emit(this.searchForm.value as SearchValue);
  }
}

export interface SearchValue {
  origin: string;
  category: string;
  radius: number;
}
