import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { animate } from 'animejs';

import {
  BREAKPOINTS,
  getViewportHeight,
  getViewportWidth,
  onWindowResize,
} from '@queso/common';
import { QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-invitation-page',
  imports: [RouterLink, MatButtonModule, MatTooltipModule, QsIcon],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.scss',
})
export class InvitationPage {
  @ViewChild('mainContainer') mainContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('panel') panels!: QueryList<ElementRef<HTMLDivElement>>;

  private readonly destroyRef = inject(DestroyRef);

  protected readonly activePanelIdx = signal(0);
  protected readonly disablePanelChange = signal(true);
  protected readonly weddingCarWidth = signal(240);

  /**
   * Appearance width of the non-active panels when scaled down.
   *
   * Note: The CSS scale does not change the layout footprint of
   * the element. It will only make it appear smaller but actual
   * occupied width remains the same.
   */
  private nonActivePanelWidth = 0; // Width of scaled down panels
  private activePanelWidth = 0; // Width of active panel

  /**
   * Imaginary padding of the non-active panel due to scaling.
   */
  private nonActivePanelInternalPadding = 0;

  constructor() {
    afterNextRender({
      write: () => {
        this.setupPanels();

        onWindowResize(this.destroyRef).subscribe(() => {
          this.setupPanels();
        });
      },
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent): void {
    /**
     * Disable scrolling override if:
     *  - The panel change is disabled
     *  - The container is not available
     *  - The container height is greater than the viewport height (means scrollbar is present)
     * */
    const container = this.mainContainer?.nativeElement;
    const containerHeight = container?.getBoundingClientRect().height || 0;
    const footerHeight = 52;
    if (
      this.disablePanelChange() ||
      !container ||
      containerHeight + footerHeight > getViewportHeight()
    ) {
      return;
    }

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

  private updatePanelDimensions(): void {
    if (getViewportWidth() <= BREAKPOINTS.DESKTOP_SM) {
      this.weddingCarWidth.set(200);
      this.activePanelWidth = 500;
      this.nonActivePanelWidth = 400;
    } else {
      this.weddingCarWidth.set(240);
      this.activePanelWidth = 600;
      this.nonActivePanelWidth = 480;
    }

    this.nonActivePanelInternalPadding =
      (this.activePanelWidth - this.nonActivePanelWidth) / 2;
  }

  private setupPanels(): void {
    this.updatePanelDimensions();

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
     * 1. Calculate the viewport center and determine target position for the new active panel
     * 2. Find the current position of the new active panel
     * 3. Calculate the distance needed to move the new active panel to its target position
     * 4. Apply this distance to all panels with appropriate offsets for scaling effects
     *
     * Position specifications:
     * - Panel 0: 48px from left edge
     * - Panel 1: 300px left of viewport center
     * - Panel 2: 300px left of viewport center
     * - Panel 3: 200px left of viewport center
     * - Panel 4: Computed based on viewport center and last panel width
     */

    const previousActiveIdx = this.activePanelIdx();
    const direction = newActiveIdx > this.activePanelIdx() ? '-' : '+';
    this.activePanelIdx.set(newActiveIdx);

    // Calculate viewport center
    const viewportWidth = getViewportWidth();
    const viewportCenter = viewportWidth / 2;

    // Get the current position of the new active panel
    const newActivePanelRect = (
      this.panels.get(newActiveIdx) as ElementRef<HTMLDivElement>
    ).nativeElement.getBoundingClientRect();
    const currentPosition = newActivePanelRect.left;

    // defaults to right of viewport center + 5% of viewport width
    let lastPanelPosition = viewportCenter + viewportWidth * 0.05;
    if (newActiveIdx === this.panels.length - 1) {
      // The last panel has a different handling because of the extra content (e.g., wedding car).
      // Here, the last panel width is computed and compared to the viewport center.
      // If the viewport center is less than the last panel width, we adjust the position of
      // the last panel to be at the left side of the viewport center instead of right.
      // This makes all the last panel content to be visible in the viewport.

      let leftMargin = 64; // Left margin of the wedding car
      if (viewportWidth <= BREAKPOINTS.DESKTOP_SM) {
        leftMargin = -8;
      }

      const lastPanelWidth =
        newActivePanelRect.width + this.weddingCarWidth() + leftMargin;
      if (viewportCenter < lastPanelWidth) {
        lastPanelPosition =
          viewportCenter - (lastPanelWidth - viewportCenter) - 50;
      }
    }

    let addedOffset = 0;
    if (viewportWidth <= BREAKPOINTS.DESKTOP_SM) {
      addedOffset = 150;
      if (newActiveIdx === 3) {
        addedOffset = 0;
      }
    }

    // Define target positions based on specifications
    const targetPositionMap: { [key: number]: number } = {
      0: 48, // 48px from left edge
      1: viewportCenter - 300 + addedOffset,
      2: viewportCenter - 300 + addedOffset,
      3: viewportCenter - 200 + addedOffset,
      4: lastPanelPosition,
    };

    // Calculate target position for the new active panel
    const targetPosition = targetPositionMap[newActiveIdx];

    // Calculate the distance needed to move the new active panel to its target position
    const distance = currentPosition - targetPosition;

    const pad = this.nonActivePanelInternalPadding; // Imaginary padding of the non-active panel
    this.panels.forEach((panel, panelIdx) => {
      const element = panel.nativeElement;
      const isActive = panelIdx === this.activePanelIdx();
      const targetScale = isActive ? 1 : 0.8;
      const opacity = isActive ? 1 : 0.8;

      let offsetX = Math.abs(distance); // initialize offsetX with the absolute distance

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
        // Handle for right direction (+)
        // Use the calculated distance directly, adjusting for direction
        offsetX = Math.abs(distance);

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
        onBegin: () => this.disablePanelChange.set(true),
        onComplete: () => this.disablePanelChange.set(false),
      });
    });
  }
}
