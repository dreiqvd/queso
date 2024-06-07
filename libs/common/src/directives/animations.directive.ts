import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { timer } from 'rxjs';

import { PlatformService } from '../services';

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
  readonly animation = input<AnimationTypes | ''>('', { alias: 'qsAnimation' });

  /** Optional animation that triggers on hover. Multiple hover animations are allowed */
  readonly animHover = input<HoverAnimations | HoverAnimations[]>();

  /** Duration of the animation in seconds.
   * @defaultvalue 1
   */
  readonly animDuration = input<number>(1);

  /** Duration of the hover animation in seconds.
   * @defaultvalue 1
   */
  readonly animHoverDuration = input<number>(1);

  /** Delay before executing the animation in seconds.
   * @defaultValue 0
   */
  readonly animDelay = input<number>(0);

  /** Delay before executing the hover animation in seconds.
   * @defaultValue 0
   */
  readonly animHoverDelay = input<number>(0);

  /** Determines if animation is manually triggered.
   * @defaultValue false
   */
  readonly animIsManual = input<boolean>(false);

  /** Controls initial visibility of the element before animating
   * @defaultValue hidden
   */
  readonly animVisibility = input<'hidden' | 'visible'>('hidden');

  /** Reference for the element to be animated. */
  private readonly element: HTMLElement;
  private readonly isAnimated = signal<boolean>(false);
  private readonly hvrAnimationsAdded = signal<boolean>(false);

  /** An observer that determines when to trigger entrance animation to an element */
  private intersectionObserver$?: IntersectionObserver;

  // Dependencies
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);
  private readonly platformService = inject(PlatformService);

  constructor() {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (this.animation()) {
      // Set initial visibility based on the passed property
      this.renderer.setStyle(this.element, 'visibility', this.animVisibility());
    } else {
      // There is no need to hide the element if it only has hover animation.
      this.renderer.setStyle(this.element, 'visibility', 'visible');
    }

    // Create an intersection observer for on demand animations (e.g. entrance).
    // Only applies if the animation is not manually triggered.
    if (
      this.animation() &&
      !this.animIsManual() &&
      this.platformService.isUsingBrowser
    ) {
      this.intersectionObserver$ = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimated()) {
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

  /** Add the hover animation classes when element is hovered. */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Either add the hover animations after the on demand animation is
    // complete or add them directly if there is no onload animation.
    if (
      !this.hvrAnimationsAdded() &&
      (this.isAnimated() || !this.animation())
    ) {
      this.addHoverAnimations();
    }
  }

  /** Add a specified animation class to the element. */
  private addClass(className: string): void {
    this.renderer.addClass(this.element, `animate__${className}`);
  }

  /** Remove a specified animation class to the element. */
  private removeClass(className: string): void {
    this.renderer.removeClass(this.element, `animate__${className}`);
  }

  /** Add a CSS property to the element.
   * Note: This function does not handle webkit properties. If needed,
   * the webkit property can be added after the call to this function.
   * @param prop - The CSS property to be added
   * @param value - The value of the CSS property
   */
  private addCssProperty(prop: string, value: number): void {
    this.renderer.setProperty(this.element.style, prop, `${value}s`);
  }

  /** Handle hover animation class names. Hover animation classes are directly applied
   * since by essence, they are triggered manually (on hover). */
  private addHoverAnimations(): void {
    const hoverAnimation = this.animHover();
    if (!hoverAnimation) return;

    // Add animation properties for hover animations.
    this.addCssProperty('animation-duration', this.animHoverDuration());
    if (this.animDelay()) {
      this.addCssProperty('animation-delay', this.animHoverDelay());
    }

    // Add class names for each hover animation.
    const hoverAnimations = Array.isArray(hoverAnimation)
      ? (hoverAnimation as string[])
      : [hoverAnimation];

    hoverAnimations.forEach((hover) => {
      this.renderer.addClass(this.element, `hvr__${hover}`);
    });

    // Make sure that hover animation classes are added only once
    this.hvrAnimationsAdded.set(true);
  }

  /** Trigger the animation on the element.
   * @param animationName - Optional animation name for manually-triggered effect.
   * @returns a Promise that resolves after the animation is complete.
   */
  public animate(animationName?: string): Promise<void> {
    return new Promise((resolve) => {
      const animation = animationName || this.animation();
      const duration = this.animDuration();
      const delay = this.animDelay();
      this.renderer.setStyle(this.element, 'visibility', 'visible');
      this.addClass('animated');

      // Add animation properties for onload animations.
      this.addCssProperty('animation-duration', duration);
      if (delay) {
        this.addCssProperty('animation-delay', delay);
      }

      if (animation) {
        this.addClass(animation);
      }

      // Remove animation class after a set duration.
      timer((duration + delay) * 1000).subscribe(() => {
        if (animation) {
          this.removeClass(animation);
        }

        this.isAnimated.set(true);

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
    this.renderer.removeChild(this.element.parentElement, this.element);
  }
}

// type ANIMATION_TYPES =
type BounceAnimations = 'bounceInDown' | 'bounceInLeft';
type FadeAnimations =
  | 'fadeIn'
  | 'fadeOut'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight';
type FlipAnimations = 'flipInX' | 'flipInY';
type RotateAnimations = 'rotateIn' | 'rotateInUpLeft' | 'rotateInCenter';
type SlideAnimations = 'slideInLeft' | 'slideInRight' | 'slideOutLeft';
type ZoomAnimations = 'zoomIn';

type AnimationTypes =
  | BounceAnimations
  | FadeAnimations
  | FlipAnimations
  | RotateAnimations
  | SlideAnimations
  | ZoomAnimations;

type HoverAnimations =
  | 'bounceToRight'
  | 'wobbleTop'
  | 'wobbleSkew'
  | 'wobbleVertical'
  | 'grow'
  | 'rubberBand'
  | 'floatShadow'
  | 'rotate'
  | 'swing'
  | 'headShake'
  | 'push';
