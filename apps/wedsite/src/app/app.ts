import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { BREAKPOINTS, getViewportWidth, onWindowResize } from '@queso/common';

import { Navigation } from './components/navigation/navigation';

@Component({
  imports: [RouterModule, Navigation],
  selector: 'app-root',
  templateUrl: './app.html',
  styles: `
    .container {
      font-family: var(--font-body);
      background:
        linear-gradient(to right, #f7efe4, #dfd4c5),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
          center/200px;
      background-blend-mode: overlay;
    }
  `,
})
export class App {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isContentVisible = signal<boolean | undefined>(undefined);

  constructor() {
    afterNextRender({
      read: () => {
        this.checkviewportWidth();

        onWindowResize(this.destroyRef).subscribe(() => {
          this.checkviewportWidth();
        });
      },
    });
  }

  private checkviewportWidth(): void {
    // Content is only visible for screens greater than or equal to MOBILE_XS
    this.isContentVisible.set(getViewportWidth() >= BREAKPOINTS.MOBILE_XS);
  }
}
