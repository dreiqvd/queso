import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { animate } from 'animejs';

import { QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-invitation-page',
  imports: [RouterLink, MatButtonModule, MatTooltipModule, QsIcon],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.scss',
})
export class InvitationPage {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('weddingCar') weddingCar!: ElementRef<HTMLDivElement>;
  @ViewChildren('panel') panels!: QueryList<ElementRef<HTMLDivElement>>;

  protected readonly activePanelIdx = signal(0);
  protected readonly disablePanelChange = signal(true);
  protected readonly showWeddingCar = signal(false);

  /**
   * Appearance width of the non-active panels when scaled down.
   *
   * Note: The CSS scale does not change the layout footprint of
   * the element. It will only make it appear smaller but actual
   * occupied width remains the same.
   */
  private nonActivePanelWidth = 480; // Width of scaled down panels
  private activePanelWidth = 600; // Width of active panel

  /**
   * Imaginary padding of the non-active panel due to scaling.
   */
  private nonActivePanelInternalPadding =
    (this.activePanelWidth - this.nonActivePanelWidth) / 2;

  constructor() {
    afterNextRender({
      write: () => this.setupPanels(),
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent): void {
    const container = this.scrollContainer?.nativeElement;
    if (!container) return;

    // Convert vertical scroll to horizontal scroll with increased scroll size
    const offset = 7; // The higher the value, the bigger the scroll step
    const scrollAmount = (e.deltaY || e.deltaX) * offset;
    if (scrollAmount > 0) {
      if (this.activePanelIdx() !== this.panels.length - 1) {
        this.setActivePanel(this.activePanelIdx() + 1);
      }
    } else {
      if (this.activePanelIdx() !== 0) {
        // If the active panel is not the first one, scroll to the previous panel
        this.setActivePanel(this.activePanelIdx() - 1);
      }
    }
  }

  private setupPanels(): void {
    let xOffset = 0; // start offset at 0 position
    this.panels.forEach((panel, idx) => {
      const element = panel.nativeElement;
      if (idx !== 0) {
        if (idx === this.activePanelIdx() + 1) {
          // If this is the next panel after the active one, use active panel
          // width subtracted by the imaginary padding of the non-active panel.
          xOffset += this.activePanelWidth - this.nonActivePanelInternalPadding;
        } else {
          xOffset += this.nonActivePanelWidth;
        }

        // After computing offset, we add a fixed gap value so
        // that spacing between panels does not look too tight.
        xOffset += 48;
      } else {
        xOffset = 48; // Internal padding of the scrolling container;
      }

      const isActive = idx === 0;
      const targetScale = isActive ? 1 : 0.8;
      const opacity = isActive ? 1 : 0.8;
      animate(element, {
        x: [{ from: 0, to: xOffset, duration: 800 }],
        scale: [{ from: 0.8, to: targetScale, duration: 800 }],
        opacity: [{ from: 0, to: opacity, duration: 1000, ease: 'linear' }],
        visibility: 'visible',
        onComplete: () => this.disablePanelChange.set(false),
      });
    });
  }

  setActivePanel(newActiveIdx: number): void {
    if (newActiveIdx === this.activePanelIdx() || this.disablePanelChange()) {
      return;
    }

    /**
     * Panel repositioning logic:
     * 1. For each active index, set a defined position for the first panel.
     * Context: First panel will always be on a specific position based on an active index.
     * Example: If the new active index is 2, the first panel should be at -600px from the left.
     *
     * 2. Compute the distance the first panel should move based on the new active index.
     * In the example above, if the current position of the first panel is at -800px, we then need
     * to move 200px of distance for it to reach -600px. This distance will be the same for all panels.
     *
     * 3. Distance alone is not enough. A varying offset should also be computed based on the
     * position (to the left or to the right) of other panels relative to the active panel. This
     * is because, a new active panel will expand in size and the previous active panel will shrink.
     * There will be different offsets for each panel depending if they exist to the left or right
     * side of the active panel.
     *
     * Drawback: Since the computation is based on the current position of the first panel,
     * the animation has to be completed first before allowing the user to change the active panel.
     * This is to ensure that the first panel is always at the correct position before the next change.
     */

    const previousActiveIdx = this.activePanelIdx();
    const direction = newActiveIdx > this.activePanelIdx() ? '-' : '+';
    this.activePanelIdx.set(newActiveIdx);

    const firstPanelBaseOffset = 48; // This is the left padding of the scroll container
    const firstPanelPositionMap: { [key: number]: number } = {
      0: firstPanelBaseOffset,
      1: 400,
      2: 600,
      3: 800,
      4: 1200,
    };

    const firstPanelEl = this.panels.first.nativeElement as HTMLDivElement;
    const currentFirstPanelPosition = firstPanelEl.getBoundingClientRect().left;

    const targetXOffset = firstPanelPositionMap[newActiveIdx] || 0;

    // Compute how far the first panel should move
    const distance = Math.abs(currentFirstPanelPosition + targetXOffset);

    const pad = this.nonActivePanelInternalPadding; // Imaginary padding of the non-active panel
    this.panels.forEach((panel, panelIdx) => {
      const element = panel.nativeElement;
      const isActive = panelIdx === this.activePanelIdx();
      const targetScale = isActive ? 1 : 0.8;
      const opacity = isActive ? 1 : 0.8;

      let offsetX = distance; // initialize offsetX with the calculated distance

      /** Compute offset based on the direction (to the left or to the right) */

      // Handle for left direction
      if (direction === '-') {
        if (previousActiveIdx === panelIdx) {
          // Add the padding offset to the previous active panel since it shrunk in size.
          offsetX += pad;
        }

        if (panelIdx > previousActiveIdx) {
          // Add the WHOLE padding offset for any panel to the right of the previous active panel.
          // This is to compensate for the shrinking of the previous active panel.
          offsetX += pad * 2;
        }

        if (panelIdx > newActiveIdx) {
          // Subtract the WHOLE padding offset for any panel to the right of the new active panel.
          // This is to compensate for the expanding of the new active panel.
          offsetX -= pad * 2;
        }

        if (isActive) {
          // Subtract the padding offset to the new active panel since it expanded in size.
          offsetX -= pad;
        }
      } else {
        // Add the first panel base offset to the offsetX. This will make the
        // reference point to be the original position of the first panel.
        offsetX += firstPanelBaseOffset * 2;

        if (previousActiveIdx === panelIdx) {
          // Subtract the padding offset to the previous active panel since it shrunk in size
          offsetX -= pad;
        }

        if (panelIdx > previousActiveIdx) {
          // Subtract the WHOLE padding offset for any panel to the right of the previous active panel.
          // This is to compensate for the shrinking of the previous active panel.
          offsetX -= pad * 2;
        }

        if (panelIdx > newActiveIdx) {
          // Add the WHOLE padding offset for any panel to the right of the new active panel.
          // This is to compensate for the expanding of the new active panel.
          offsetX += pad * 2;
        }

        if (isActive) {
          // Add the padding offset to the new active panel since it expanded in size.
          offsetX += pad;
        }
      }

      animate(element, {
        x: `${direction}=${offsetX}px`,
        scale: [{ from: 0.8, to: targetScale, duration: 800 }],
        opacity: [{ from: 0.8, to: opacity, duration: 800 }],
        onBegin: () => {
          this.disablePanelChange.set(true);
          this.showWeddingCar.set(false);
        },
        onComplete: () => {
          this.disablePanelChange.set(false);
          if (this.activePanelIdx() === 4) {
            this.showWeddingCar.set(true);
            animate(this.weddingCar.nativeElement, {
              opacity: [{ from: 0, to: 1, duration: 300 }],
            });
          }
        },
      });
    });
  }
}
