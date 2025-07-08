import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { QsIcon } from '@queso/ui-kit/icon';

@Component({
  selector: 'app-invitation-page',
  imports: [RouterLink, MatButtonModule, MatTooltipModule, QsIcon],
  templateUrl: './invitation-page.html',
  styleUrl: './invitation-page.scss',
})
export class InvitationPage {
  @ViewChild('panelsContainer') panelsContainer!: ElementRef<HTMLDivElement>;

  protected readonly showInvitationContent = signal(false);

  constructor() {
    afterNextRender(() => {
      // this.setupSmoothScrolling();
    });
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(e: WheelEvent): void {
    // e.preventDefault();
    const container = this.panelsContainer?.nativeElement;
    if (!container) return;

    // Convert vertical scroll to horizontal scroll with increased scroll size
    const offset = 7; // The higher the value, the bigger the scroll step
    const scrollAmount = (e.deltaY || e.deltaX) * offset;

    // Smooth scrolling with requestAnimationFrame
    const startScrollLeft = container.scrollLeft;
    const targetScrollLeft = startScrollLeft + scrollAmount;

    // Clamp the target scroll position
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedTarget = Math.max(0, Math.min(targetScrollLeft, maxScroll));

    const distance = clampedTarget - startScrollLeft;
    container.scrollLeft = startScrollLeft + distance;
  }

  onHeaderTypingComplete(): void {
    setTimeout(() => {
      this.showInvitationContent.set(true);
    }, 1000);
  }
}
