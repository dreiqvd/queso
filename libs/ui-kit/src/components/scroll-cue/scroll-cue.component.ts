import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

type ScrollCueAppearance = 'mouse' | 'arrow-circle' | 'arrow' | 'chevron';

@Component({
  selector: 'qs-scroll-cue',
  standalone: true,
  imports: [NgClass, MatTooltip],
  templateUrl: './scroll-cue.component.html',
  styleUrl: './scroll-cue.component.scss',
})
export class ScrollCueComponent {
  /** Appearance type of the scroll cue.
   *  @defaultValue 'arrow-circle'
   */
  appearance = input<ScrollCueAppearance>('arrow-circle');

  /** ARIA label to apply on the element.
   * @defaultValue 'Scroll down'
   */
  ariaLabel = input<string>('Scroll down');

  /** Optional tooltip message to be shown upon hover. */
  tooltip = input<string>();
}
