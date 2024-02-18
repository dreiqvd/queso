import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

import { BREAKPOINTS, PlatformService } from '@queso/common';
import { getViewportWidth } from '@queso/utils';

@Component({
  selector: 'qs-home-hero',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
})
export class HomeHeroComponent implements OnInit {
  readonly greetingText1 = 'Hi, I am'.split('');
  readonly greetingText2 = 'Drei'.split('');
  readonly shouldBreakText = signal(false);

  constructor(private platformService: PlatformService) {
    if (this.platformService.isUsingBrowser()) {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.checkTextBreak();
        });
    }
  }

  ngOnInit(): void {
    this.checkTextBreak();
  }

  /** Checks whether to apply line break to greeting text */
  private checkTextBreak(): void {
    if (this.platformService.isUsingBrowser()) {
      this.shouldBreakText.set(getViewportWidth() <= BREAKPOINTS.TABLET_SM);
    }
  }
}
