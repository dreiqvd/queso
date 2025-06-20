import { KeyValuePipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';

@Component({
  imports: [KeyValuePipe],
  selector: 'qs-countdown-flip-card',
  templateUrl: './countdown-flip-card.html',
  styleUrl: './countdown-flip-card.scss',
})
export class QsCountdownFlipCard implements OnDestroy {
  @ViewChildren('flipClockPiece') flipClockPieces!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  private readonly targetDate = new Date('2025-09-13T00:00:00.000Z');
  private animationFrameId: number | null = null;
  private throttleOffset = 0;

  flipCardTrackers = signal<FlipCardTracker>({
    days: { top: '', bottom: '', back: '', backBottom: '', currentValue: '' },
    hours: { top: '', bottom: '', back: '', backBottom: '', currentValue: '' },
    mins: {
      top: '',
      bottom: '',
      back: '',
      backBottom: '',
      currentValue: '',
    },
    secs: {
      top: '',
      bottom: '',
      back: '',
      backBottom: '',
      currentValue: '',
    },
  });
  flipStatuses = signal<{ [key: string]: boolean }>({
    days: false,
    hours: false,
    mins: false,
    secs: false,
  });

  constructor() {
    afterNextRender(() => {
      this.initialize();
    });
  }

  private initialize(): void {
    this.initializeCountdownTrackers();
    this.updateClock();
  }

  // Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
  private getTimeRemaining(): [TimeUnits, number] {
    const timeRemaining = this.targetDate.getTime() - new Date().getTime();
    const trackers = {
      days: this.getDigits(Math.floor(timeRemaining / (1000 * 60 * 60 * 24))),
      hours: this.getDigits(
        Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
      ),
      mins: this.getDigits(Math.floor((timeRemaining / 1000 / 60) % 60)),
      secs: this.getDigits(Math.floor((timeRemaining / 1000) % 60)),
    };

    return [trackers, timeRemaining];
  }

  private initializeCountdownTrackers(): void {
    const [trackers] = this.getTimeRemaining();
    const countdownTrackers = {} as unknown as FlipCardTracker;
    for (const unitKey in trackers) {
      countdownTrackers[unitKey as keyof FlipCardTracker] = {
        top: trackers[unitKey as keyof TimeUnits],
        bottom: trackers[unitKey as keyof TimeUnits],
        back: trackers[unitKey as keyof TimeUnits],
        backBottom: trackers[unitKey as keyof TimeUnits],
        currentValue: trackers[unitKey as keyof TimeUnits],
      };
    }
    this.flipCardTrackers.set(countdownTrackers);
  }

  private updateClock(): void {
    this.animationFrameId = requestAnimationFrame(() => this.updateClock());

    // throttle so it's not constantly updating the time.
    if (this.throttleOffset++ % 10) return;

    const oldTrackers: FlipCardTracker = { ...this.flipCardTrackers() };
    const [trackers, timeRemaining] = this.getTimeRemaining();
    if (timeRemaining <= 0) {
      // Call handle for finished countdown
      cancelAnimationFrame(this.animationFrameId as number);
    }

    Object.keys(trackers).forEach((key) => {
      const unit = key as keyof TimeUnits;
      const newValue = trackers[unit];
      let currentValue = oldTrackers[unit].currentValue;
      if (newValue !== currentValue) {
        // Retain back and bottom as the previous current values. This is to simulate an effect where
        // the number does not flicker when changing, but rather flips to the new value.
        const back = currentValue;
        const bottom = currentValue;

        currentValue = newValue; // Update to new value
        const top = currentValue;
        const backBottom = currentValue;

        // Set flip status to true for animation
        this.flipStatuses.set({
          ...this.flipStatuses(),
          [unit]: true,
        });

        // Update tracker values for the unit
        this.flipCardTrackers.set({
          ...this.flipCardTrackers(),
          [unit]: {
            top,
            bottom,
            back,
            backBottom,
            currentValue,
          },
        });

        // Void offsetWidth to trigger reflow for the flip animation
        const flipPiece = this.flipClockPieces.find(
          (piece) => piece.nativeElement.id === `flip-clock__${unit}`
        );
        if (flipPiece) {
          void flipPiece.nativeElement.offsetWidth; // Trigger reflow
        }

        // Reset flip status after a delay to allow the animation to complete
        // This delay should match the duration of the flip animation
        setTimeout(() => {
          this.flipStatuses.set({
            ...this.flipStatuses(),
            [unit]: false,
          });
        }, 600);
      }
    });
  }

  private getDigits(number: number, padLength = 2): string {
    return number.toString().padStart(padLength, '0');
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId as number);
    }
  }
}

interface TimeUnits {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

interface FlipCardTracker {
  days: {
    top: string;
    bottom: string;
    back: string;
    backBottom: string;
    currentValue: string;
  };
  hours: {
    top: string;
    bottom: string;
    back: string;
    backBottom: string;
    currentValue: string;
  };
  mins: {
    top: string;
    bottom: string;
    back: string;
    backBottom: string;
    currentValue: string;
  };
  secs: {
    top: string;
    bottom: string;
    back: string;
    backBottom: string;
    currentValue: string;
  };
}
