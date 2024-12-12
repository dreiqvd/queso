import { NgClass } from '@angular/common';
import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime, fromEvent } from 'rxjs';

import {
  BREAKPOINTS,
  getViewportHeight,
  getViewportWidth,
} from '@queso/common';
import { QsAnimationsDirective } from '@queso/common/animations';
import { QsIconComponent } from '@queso/ui-kit/icon';
import { QsPillComponent } from '@queso/ui-kit/pill';

import { SearchResult } from '../../core/interfaces';
import { SearchService } from '../../services';
import { SearchFormComponent } from '../search-form';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    MatTooltip,
    QsIconComponent,
    QsPillComponent,
    QsAnimationsDirective,
    SearchFormComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('resultsWrapper') resultsWrapperRef?: ElementRef<HTMLElement>;
  @Output() toggleDirections = new EventEmitter<SearchResult['location']>();
  @Output() toggleSidebar = new EventEmitter<boolean>();

  // Dependencies
  private readonly searchService = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);

  // Sidebar states
  readonly isSidebarOpen = signal(true);
  readonly showSidebarContent = signal(true);
  readonly showLoader = signal(false);
  readonly showLocationAccessMsg = signal(false);
  readonly showResults = signal(false);
  readonly resultsWrapperHeight = signal('auto');

  // Misc
  readonly searchResults = signal<SearchResult[]>([]);
  readonly resultsCount = signal(0);
  readonly isSmallViewPort = signal(false);

  constructor() {
    this.searchService.searchStarted$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.handleSearchStart());

    this.searchService.searchEnded$
      .pipe(takeUntilDestroyed())
      .subscribe((res) => this.handleSearchEnd(res));

    afterNextRender(
      () => {
        this.adjustLayout();

        fromEvent(window, 'resize')
          .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.adjustLayout());
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  /** Adjust positioning and display of DOM elements based on certain states */
  private adjustLayout(): void {
    // Determine if viewport is in small
    this.isSmallViewPort.set(getViewportWidth() <= BREAKPOINTS.MOBILE_MD);

    // Compute the height of the search results wrapper element
    if (this.resultsWrapperRef && !this.isSmallViewPort()) {
      const wrapperElement = this.resultsWrapperRef.nativeElement;
      const offsetTop = wrapperElement.getBoundingClientRect().top;
      const wrapperHeight = getViewportHeight() - offsetTop - 60;
      this.resultsWrapperHeight.set(`${wrapperHeight}px`);
    } else {
      this.resultsWrapperHeight.set('auto');
    }
  }

  /** Reset states on search start */
  private handleSearchStart(): void {
    this.showLocationAccessMsg.set(false);
    this.showResults.set(false);
    this.showLoader.set(true);
    this.searchResults.set([]);
  }

  /** Handles event when search ended */
  private handleSearchEnd(results: SearchResult[] | 'DENIED'): void {
    if (results === 'DENIED') {
      this.showLoader.set(false);
      this.showLocationAccessMsg.set(true);
    } else {
      // Set a 1 second delay to show the loader
      this.resultsCount.set(results.length);
      setTimeout(() => {
        this.showLoader.set(false);
        this.showResults.set(true);
        this.searchResults.set(results);
      }, 1000);
    }
  }

  /** Collapse or opens the sidebar */
  onToggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
    if (this.isSidebarOpen()) {
      // allow a delay before showing the sidebar content
      setTimeout(() => {
        this.showSidebarContent.set(true);
      }, 500);
    } else {
      this.showSidebarContent.set(false);
    }

    this.toggleSidebar.emit(this.isSidebarOpen());
  }
}
