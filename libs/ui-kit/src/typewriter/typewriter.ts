import {
  afterNextRender,
  Component,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'qs-typewriter',
  imports: [],
  template: `
    <span
      class="typewriter"
      [class.no-cursor]="isTypingComplete() && hideCursorOnComplete()"
    >
      {{ displayedText() }}
    </span>
  `,
  styles: [
    `
      .typewriter {
        border-right: 2px solid;
        animation: blink 1s infinite;

        &.no-cursor {
          border-right: 0;
        }
      }

      @keyframes blink {
        0%,
        50% {
          border-color: transparent;
        }
        51%,
        100% {
          border-color: currentColor;
        }
      }
    `,
  ],
})
export class TypewriterComponent implements OnDestroy {
  /**
   * The text to be displayed with the typing animation.
   */
  readonly text = input.required<string>();

  /**
   * The speed of the typing animation in milliseconds.
   * A lower value means faster typing.
   * @defaultValue 100
   */
  readonly typingSpeed = input<number>(100);

  /**
   * Whether to hide the blinking cursor after typing completes.
   * @defaultValue true
   */
  readonly hideCursorOnComplete = input<boolean>(true);

  /**
   * Emitted when the typing animation completes.
   */
  readonly typingComplete = output<void>();

  protected readonly displayedText = signal('');
  protected readonly isTypingComplete = signal(false);

  private intervalId?: number;

  constructor() {
    afterNextRender(() => {
      this.startTypingAnimation();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTypingAnimation(): void {
    const fullText = this.text();
    const speed = this.typingSpeed();
    let currentIndex = 0;

    this.displayedText.set('');

    this.intervalId = window.setInterval(() => {
      if (currentIndex < fullText.length) {
        this.displayedText.set(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Animation complete, clear the interval and emit completion
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.isTypingComplete.set(true);
        this.typingComplete.emit();
      }
    }, speed);
  }
}
