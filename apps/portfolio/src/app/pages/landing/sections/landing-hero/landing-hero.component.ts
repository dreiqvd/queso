import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime, fromEvent } from 'rxjs';

import { BREAKPOINTS, getViewportWidth } from '@queso/common';
import { QsAnimations } from '@queso/common/animations';
import { QsIcon } from '@queso/ui-kit/icon';
import { QsScrollCue } from '@queso/ui-kit/scroll-cue';

@Component({
  selector: 'app-landing-hero',
  imports: [NgTemplateOutlet, MatTooltip, QsIcon, QsScrollCue, QsAnimations],
  templateUrl: './landing-hero.component.html',
  styles: `
    .header-title {
      filter: drop-shadow(5px 4px 0 var(--color-accent-red));

      .greeting-ch {
        &.space {
          width: 24px;
        }
      }
    }
  `,
})
export class LandingHero {
  @ViewChild('headerBlobWrapper')
  headerBlobWrapper!: ElementRef<HTMLElement>;

  @ViewChild('headerBlobAnchor')
  headerBlobAnchor!: ElementRef<HTMLElement>;

  // Event that is emitted when the user clicks on the CTA button
  @Output() ctaClick = new EventEmitter<void>();

  // Dependencies
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  readonly greetingText1 = 'Hi, I am'.split('');
  readonly greetingText2 = 'Drei'.split('');
  readonly shouldBreakText = signal(false);

  constructor() {
    afterNextRender({
      write: () => {
        this.adjustLayout();

        // Adjust layout on window resize
        fromEvent(window, 'resize')
          .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
          .subscribe(() => this.adjustLayout());
      },
    });
  }

  /** Adjust positioning and display of DOM elements based on certain states */
  private adjustLayout(): void {
    // Determine if greeting text should have a line break
    this.shouldBreakText.set(getViewportWidth() <= BREAKPOINTS.TABLET_MD);

    // Reposition the header blob
    const blobAnchorEl = this.headerBlobAnchor.nativeElement;
    const blobWrapperEl = this.headerBlobWrapper.nativeElement;
    const left = blobAnchorEl.getBoundingClientRect().left;
    this.renderer.setStyle(blobWrapperEl, 'left', `${left}px`);
  }
}
