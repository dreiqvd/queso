import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { fromEvent } from 'rxjs';

import {
  AnimationsDirective,
  BREAKPOINTS,
  getViewportWidth,
  PlatformService,
} from '@queso/common';
import { IconComponent } from '@queso/ui-kit/icon';
import { ScrollCueComponent } from '@queso/ui-kit/scroll-cue';

@Component({
  selector: 'qs-home-hero',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    IconComponent,
    ScrollCueComponent,
    MatTooltip,
    AnimationsDirective,
  ],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
})
export class HomeHeroComponent implements OnInit, AfterViewInit {
  @ViewChild('headerBlobWrapper') headerBlobWrapper!: ElementRef<HTMLElement>;
  @ViewChild('headerBlobAnchor') headerBlobAnchor!: ElementRef<HTMLElement>;

  readonly greetingText1 = 'Hi, I am'.split('');
  readonly greetingText2 = 'Drei'.split('');
  readonly shouldBreakText = signal(false);

  constructor(
    private renderer: Renderer2,
    private platformService: PlatformService
  ) {
    if (this.platformService.isUsingBrowser()) {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.checkTextBreak();
          this.repositionBlob();
        });
    }
  }

  ngOnInit(): void {
    this.checkTextBreak();
  }

  ngAfterViewInit(): void {
    this.repositionBlob();
  }

  /** Checks whether to apply line break to greeting text */
  private checkTextBreak(): void {
    if (this.platformService.isUsingBrowser()) {
      this.shouldBreakText.set(getViewportWidth() <= BREAKPOINTS.TABLET_MD);
    }
  }

  /** Change positioning of the header blob */
  private repositionBlob(): void {
    if (this.platformService.isUsingBrowser()) {
      const blobAnchorEl = this.headerBlobAnchor.nativeElement;
      const blobWrapperEl = this.headerBlobWrapper.nativeElement;
      const left = blobAnchorEl.getBoundingClientRect().left;
      this.renderer.setStyle(blobWrapperEl, 'left', `${left}px`);
    }
  }
}
