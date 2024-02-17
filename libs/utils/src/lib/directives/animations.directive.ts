import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * This directive provides animation capabilities to an element. There can be an animation
 * that gets triggered on load and another animation that gets triggered on hover.
 * How does it work?
 *  The directive adds the specified animation class to the element.
 *  The class is then removed after a certain duration to avoid conflicts with other animations.
 * */
@Directive({
  standalone: true,
  selector: '[qsAnimation]',
})
export class AnimationsDirective implements OnInit {
  /** Optional animation that triggers on load. */
  @Input({ alias: 'qsAnimation' }) animation?: string;

  /** Optional animation that triggers on hover. */
  @Input() animHover?: string;

  /** Duration of the animation in seconds.
   * @defaultvalue 1
   */
  @Input() animDuration = 1;

  /** Delay before executing the animation in seconds.
   * @defaultValue 0
   */
  @Input() animDelay = 0;

  /** Determines if animation is manually triggered.
   * @defaultValue false
   */
  @Input() animIsManual = false;

  /** Whether to remove element from DOM after the animation.
   * @defaultValue false
   */
  @Input() animDisposeOnComplete = false;

  /** Reference for the element to be animated. */
  private readonly element: HTMLElement;

  private isAnimated = false;

  constructor(private rendererer: Renderer2, private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.verifyAnimation();
    if (!this.isAnimated && !this.animIsManual) {
      this.animate();
    }
  }

  /** Verify if at least on-load or hover animation is provided. */
  private verifyAnimation(): void {
    if (!this.animation && !this.animHover) {
      let elementRef = '';
      if (this.element.className) elementRef += `.${this.element.className}`;
      if (this.element.id) elementRef += ` #${this.element.id}`;
      throw new Error(
        `No animation specified on element: "${elementRef}". Please provide an onload animation or a hover animation.`
      );
    }
  }

  /** Add a specified animation class to the element. */
  private addClass(className: string): void {
    this.rendererer.addClass(this.element, `animate__${className}`);
  }

  /** Remove a specified animation class to the element. */
  private removeClass(className: string): void {
    this.rendererer.removeClass(this.element, `animate__${className}`);
  }

  /** Add a CSS property to the element.
   * Note: This function does not handle webkit properties. If needed,
   * the webkit property can be added after the call to this function.
   * @param prop - The CSS property to be added
   * @param value - The value of the CSS property
   */
  private addCssProperty(prop: string, value: number): void {
    this.rendererer.setProperty(this.element.style, prop, `${value}s`);
  }

  /** Trigger the animation on the element. */
  public animate(): void {
    this.addClass('animated');
    this.addCssProperty('animation-duration', this.animDuration);

    if (this.animDelay) {
      this.addCssProperty('animation-delay', this.animDelay);
    }

    if (this.animation) {
      this.addClass(this.animation);
    }

    // Remove animation class after a set duration. This is to avoid
    // conflicts with other animations that have been added (e.g. hover animation)
    setTimeout(() => {
      if (this.animation) {
        this.removeClass(this.animation);
      }

      if (this.animDisposeOnComplete) {
        this.rendererer.removeChild(this.element.parentElement, this.element);
      }

      this.isAnimated = true;
    }, (this.animDuration + this.animDelay) * 1000);
  }
}
