import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { timer } from 'rxjs';

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
export class AnimationsDirective implements OnInit, OnDestroy {
  /** Optional animation that triggers on load. */
  @Input({ alias: 'qsAnimation' }) animation?: string;

  /** Optional animation that triggers on hover. Multiple hover animations are allowed */
  @Input() animHover?: string | string[];

  /** Duration of the animation in seconds.
   * @defaultvalue 1
   */
  @Input() animDuration = 1;

  /** Duration of the hover animation in seconds.
   * @defaultvalue 1
   */
  @Input() animHoverDuration = 1;

  /** Delay before executing the animation in seconds.
   * @defaultValue 0
   */
  @Input() animDelay = 0;

  /** Delay before executing the hover animation in seconds.
   * @defaultValue 0
   */
  @Input() animHoverDelay = 0;

  /** Determines if animation is manually triggered.
   * @defaultValue false
   */
  @Input() animIsManual = false;

  /** Controls initial visibility of the element before animating
   * @defaultValue hidden
   */
  @Input() animVisibility: 'hidden' | 'visible' = 'hidden';

  /** Reference for the element to be animated. */
  private readonly element: HTMLElement;

  /** An observer that determines when to trigger entrance animation to an element */
  private intersectionObserver$?: IntersectionObserver;

  private isAnimated = false;

  constructor(
    private rendererer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    // Initially set element to be hidden.
    this.rendererer.setStyle(this.element, 'visibility', this.animVisibility);

    // Immediately apply hover animations if there are no on demand animations.
    // A check is needed to avoid conflicts with ongoing animations.
    if (!this.animation) {
      this.handleHoverAnimations();
    }

    // Create an intersection observer for on demand animations (e.g. entrance).
    // Only applies if the animation is not manually triggered.
    if (this.animation && !this.animIsManual) {
      this.intersectionObserver$ = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimated) {
            this.animate();
          }
        });
      });
    }

    this.intersectionObserver$?.observe(this.element);
  }

  ngOnDestroy(): void {
    this.intersectionObserver$?.disconnect();
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

  /** Handle hover animation class names. Hover animation classes are directly applied
   * since by essence, they are triggered manually (on hover). */
  private handleHoverAnimations(): void {
    if (!this.animHover) return;

    // Add animation properties for hover animations.
    this.addCssProperty('animation-duration', this.animHoverDuration);
    if (this.animDelay) {
      this.addCssProperty('animation-delay', this.animHoverDelay);
    }

    // Add class names for each hover animation.
    const hoverAnimations = Array.isArray(this.animHover)
      ? this.animHover
      : [this.animHover];
    hoverAnimations.forEach((hover) => {
      this.rendererer.addClass(this.element, `hvr-${hover}`);
    });
  }

  /** Trigger the animation on the element.
   * @param animationName - Optional animation name for manually-triggered effect.
   * @returns a Promise that resolves after the animation is complete.
   */
  public animate(animationName?: string): Promise<void> {
    return new Promise((resolve) => {
      const animation = animationName || this.animation;
      this.rendererer.setStyle(this.element, 'visibility', 'visible');
      this.addClass('animated');

      // Add animation properties for onload animations.
      this.addCssProperty('animation-duration', this.animDuration);
      if (this.animDelay) {
        this.addCssProperty('animation-delay', this.animDelay);
      }

      if (animation) {
        this.addClass(animation);
      }

      // Remove animation class after a set duration.
      timer((this.animDuration + this.animDelay) * 1000).subscribe(() => {
        if (animation) {
          this.removeClass(animation);
        }

        this.isAnimated = true;
        // Allow hover animations after the element has been animated. This is to
        // avoid conflicts with the onload animation.
        this.handleHoverAnimations();

        // Disconnect from intersection observer after animation is complete.
        this.intersectionObserver$?.disconnect();

        // Resolve promise to mark animation as complete.
        resolve();
      });
    });
  }

  /** Manually remove an element from DOM. This is particularly useful for cases where element
   * should be deleted after animation (e.g. exit animations).
   */
  public removeElement(): void {
    this.rendererer.removeChild(this.element.parentElement, this.element);
  }
}
