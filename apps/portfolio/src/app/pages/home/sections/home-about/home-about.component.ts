import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  signal,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { AnimationsDirective } from '@queso/common';

import { IconComponent } from '@queso/ui-kit/icon';

@Component({
  selector: 'qs-home-about',
  standalone: true,
  imports: [IconComponent, MatTooltip, NgOptimizedImage, AnimationsDirective],
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss',
})
export class HomeAboutComponent {
  @ViewChild('portraitBlob') portraitBlob!: ElementRef<HTMLElement>;
  @ViewChild('portraitImg') portraitImg!: ElementRef<HTMLElement>;
  @ViewChild('sideContentRef') sideContentRef!: ElementRef<HTMLElement>;

  readonly isPortraitBlobVisible = signal(false);

  constructor(private renderer: Renderer2) {}

  /** Reposition portrait blob in relation to the portrait image position */
  private repositionPortraitBlob(): void {
    const portraitImg = this.portraitImg.nativeElement;
    const portraitBlob = this.portraitBlob.nativeElement;
    const portraitImgHeight = portraitImg.clientHeight;
    const portraitBlobHeight = portraitBlob.clientHeight;
    const diff = portraitImgHeight - portraitBlobHeight;
    const bottom = (diff >= 0 ? diff : 0) + 40;
    this.renderer.setStyle(portraitBlob, 'bottom', `${bottom}px`);
    this.renderer.setStyle(
      this.sideContentRef.nativeElement,
      'height',
      `${portraitBlobHeight + bottom}px`
    );
    this.isPortraitBlobVisible.set(true);
  }

  /** Handles event when the portrait image has been fetched */
  onPortraitImgLoad(): void {
    this.repositionPortraitBlob();
  }
}
