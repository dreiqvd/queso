import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';

import { getViewportHeight } from '@queso/common';

@Component({
  selector: 'app-hashtag-section',
  templateUrl: './hashtag-section.html',
  styleUrl: './hashtag-section.scss',
})
export class HashtagSection {
  @ViewChild('photosContainer') photosContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('heading') heading!: ElementRef<HTMLHeadingElement>;

  readonly isMobile = input.required<boolean>();

  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly headingNoWrap = '#EveryDreiWithTricia'.split('');
  protected readonly headingWrapped = '#EveryDrei'
    .split(' ')
    .concat('WithTricia'.split(' '));

  constructor() {
    afterNextRender({
      read: () => {
        this.setHeadingPosition();

        fromEvent(window, 'resize')
          .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.setHeadingPosition();
          });
      },
    });
  }

  private setHeadingPosition(): void {
    if (this.isMobile()) return;

    const container = this.photosContainer.nativeElement;
    const containerHeight = container.offsetHeight;
    const viewportHeight = getViewportHeight();
    // Calculate heading position based on what is smaller between
    // container height and viewport height. The goal is to center
    // the heading vertically within the visible area.
    const headingPosition = Math.min(containerHeight, viewportHeight) / 2;
    this.renderer.setStyle(
      this.heading.nativeElement,
      'top',
      `${headingPosition}px`
    );
  }
}
