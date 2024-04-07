import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
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
import { AnimationsDirective } from '@queso/common/directives';
import { PlatformService } from '@queso/common/services';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { SearchResult } from '../../app.interface';
import { SearchService } from '../../services/search.service';
import { SearchFormComponent } from '../search-form';

@Component({
  selector: 'qs-sidebar',
  standalone: true,
  imports: [
    NgClass,
    MatTooltip,
    IconComponent,
    PillComponent,
    AnimationsDirective,
    SearchFormComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('resultsWrapper') resultsWrapperRef?: ElementRef<HTMLElement>;
  @Output() toggleDirections = new EventEmitter<SearchResult['location']>();
  @Output() toggleSidebar = new EventEmitter<boolean>();

  // Search Results
  readonly searchResults = signal<SearchResult[]>([]);

  // Sidebar states
  readonly isSidebarOpen = signal(true);
  readonly showSidebarContent = signal(true);
  readonly showLoader = signal(false);
  readonly showLocationAccessMsg = signal(false);
  readonly showResults = signal(false);
  readonly resultsWrapperHeight = signal('auto');

  // Misc
  readonly isSmallViewPort = signal(this.isUsingSmallViewPort());
  readonly resultsCount = signal(0);

  constructor(
    private platformService: PlatformService,
    private searchService: SearchService
  ) {
    this.searchService.searchStarted$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.onSearchStart();
      });

    this.searchService.searchEnded$
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.onSearchEnd(res);
      });
  }

  ngOnInit(): void {
    if (this.platformService.isUsingBrowser) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.isSmallViewPort.set(this.isUsingSmallViewPort());
          this.setSearchResultsWrapperHeight();
        });
    }
  }

  ngAfterViewInit(): void {
    this.setSearchResultsWrapperHeight();
  }

  /** Reset states on search start */
  private onSearchStart(): void {
    this.showLocationAccessMsg.set(false);
    this.showResults.set(false);
    this.showLoader.set(true);
    this.searchResults.set([]);
  }

  /** Handles event when search ended */
  private onSearchEnd(results: SearchResult[] | 'DENIED'): void {
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

  /**
   * Compute the height of the search results wrapper element
   */
  private setSearchResultsWrapperHeight(): void {
    if (
      this.platformService.isUsingBrowser &&
      this.resultsWrapperRef &&
      !this.isSmallViewPort()
    ) {
      const wrapperElement = this.resultsWrapperRef.nativeElement;
      const offsetTop = wrapperElement.getBoundingClientRect().top;
      const wrapperHeight = getViewportHeight() - offsetTop - 100; // account for fixed spaces
      this.resultsWrapperHeight.set(`${wrapperHeight}px`);
    } else {
      this.resultsWrapperHeight.set('auto');
    }
  }

  /** Determines if current viewport is for small screen */
  private isUsingSmallViewPort(): boolean {
    if (this.platformService.isUsingBrowser) {
      return getViewportWidth() <= BREAKPOINTS.MOBILE_MD;
    }

    return false;
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
