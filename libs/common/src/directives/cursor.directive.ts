import {
  afterNextRender,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

import { BREAKPOINTS } from '../constants';
import { getViewportWidth } from '../helpers';

/**
 * This directive provides a custom cursor inside the container element.
 */
@Directive({
  standalone: true,
  selector: '[qsCustomCursor]',
})
export class QsCursorDirective {
  // Dependencies
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  /** Reference for the element to be animated. */
  public readonly element: HTMLElement;

  /** Container element of the custom cursor */
  private cursorContainer!: HTMLDivElement;

  /** Holds the current position of the cursor */
  private mousePosition = { x: 0, y: 0 };

  /** Holds the array of cursor particles */
  private particles: CursorParticle[] = [];

  /** Reference for the idle timeout */
  private timeoutId!: ReturnType<typeof setTimeout>;

  /** Determines if the cursor is idle */
  private isIdle = false;

  /** Determines whether the cursor setup has been initialized */
  private isInitialized = false;

  constructor() {
    this.element = this.elementRef.nativeElement;
    afterNextRender(() => {
      // The custom cursor experiences performance issues on screens other than desktops.
      // Therefore, it's currently restricted to non-desktop views only.
      if (getViewportWidth() < BREAKPOINTS.DESKTOP_SM) return;

      this.renderer.setStyle(this.element, 'cursor', 'none');
      this.setCursorContainer();
      this.buildCursorParticles();
      this.renderCursor();
      this.isInitialized = true;
    });
  }

  /**
   * Handle mouse move event
   */
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isInitialized) return;

    this.mousePosition.x = event.clientX - CURSOR_WIDTH / 2;
    this.mousePosition.y = event.clientY - CURSOR_WIDTH / 2;
    this.resetIdleTimer();
  }

  /**
   * Handle touch move event
   */
  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isInitialized) return;

    this.mousePosition.x = event.touches[0].clientX - CURSOR_WIDTH / 2;
    this.mousePosition.y = event.touches[0].clientY - CURSOR_WIDTH / 2;
    this.resetIdleTimer();
  }

  /** Set up container of the custom mouse cursor */
  private setCursorContainer(): void {
    this.cursorContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(this.cursorContainer, 'id', 'cursor-container'); // Important: This ID should match the one in the global styles file
    this.renderer.appendChild(this.element, this.cursorContainer);

    // Add the SVG filter for the cursor
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>`;
    const svgWrapper = this.renderer.createElement('div') as HTMLDivElement;
    this.renderer.setStyle(svgWrapper, 'display', 'none');
    this.renderer.setProperty(svgWrapper, 'innerHTML', svgString);
    this.renderer.appendChild(this.element, svgWrapper);
  }

  /** Populate cursor particle elements */
  private buildCursorParticles(): void {
    for (let i = 0; i < AMOUNT; i++) {
      this.particles.push(
        new CursorParticle(i, this.cursorContainer, this.renderer)
      );
    }
  }

  /** Render mouse animation */
  private renderCursor = (): void => {
    this.setCursorPosition();
    requestAnimationFrame(this.renderCursor);
  };

  /** Compute position of the mouse cursor */
  private setCursorPosition = (): void => {
    let x = this.mousePosition.x;
    let y = this.mousePosition.y;
    this.particles.forEach((particle, index, particles) => {
      const nextParticle = particles[index + 1] || particles[0];
      particle.xPosition = x;
      particle.yPosition = y;
      particle.draw(this.isIdle);
      if (!this.isIdle || index <= SINE_PARTICLES) {
        const dx = (nextParticle.xPosition - particle.xPosition) * 0.35;
        const dy = (nextParticle.yPosition - particle.yPosition) * 0.35;
        x += dx;
        y += dy;
      }
    });
  };

  private startIdleTimer(): void {
    this.timeoutId = setTimeout(this.goInactive, IDLE_TIMEOUT);
    this.isIdle = false;
  }

  private resetIdleTimer(): void {
    clearTimeout(this.timeoutId);
    this.startIdleTimer();
  }

  private goInactive = (): void => {
    this.isIdle = true;
    for (const particle of this.particles) {
      particle.lock();
    }
  };
}

class CursorParticle {
  private readonly renderer: Renderer2;
  private readonly angleSpeed = 0.05;
  private readonly index: number;
  private readonly scale: number;
  private readonly range: number;
  private readonly element: HTMLSpanElement;
  private lockX = 0;
  private lockY = 0;
  private angleX = 0;
  private angleY = 0;

  xPosition = 0;
  yPosition = 0;

  constructor(index: number, cursor: HTMLDivElement, renderer: Renderer2) {
    this.index = index;
    this.scale = 1 - 0.05 * index;
    this.range = CURSOR_WIDTH / 2 - (CURSOR_WIDTH / 2) * this.scale + 2;
    this.element = renderer.createElement('span');
    this.renderer = renderer;
    renderer.setStyle(this.element, 'transform', `scale(${this.scale})`);
    renderer.appendChild(cursor, this.element);
  }

  lock(): void {
    this.lockX = this.xPosition;
    this.lockY = this.yPosition;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }

  draw(idle: boolean): void {
    if (idle && this.index > SINE_PARTICLES) {
      this.angleX += this.angleSpeed;
      this.angleY += this.angleSpeed;
      this.yPosition = this.lockY + Math.sin(this.angleY) * this.range;
      this.xPosition = this.lockX + Math.sin(this.angleX) * this.range;
    }

    this.renderer.setStyle(
      this.element,
      'transform',
      `translate(${this.xPosition}px, ${this.yPosition}px) scale(${this.scale})`
    );
  }
}

const IDLE_TIMEOUT = 150;
const CURSOR_WIDTH = 26;
const AMOUNT = 20;
const SINE_PARTICLES = Math.floor(AMOUNT * 0.3);
