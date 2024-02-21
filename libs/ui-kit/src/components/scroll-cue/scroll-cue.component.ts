import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
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
   * @type 'mouse' | 'arrow-circle' | 'arrow' | 'chevron'
   * @defaultValue 'arrow-circle'
   */
  @Input() appearance: ScrollCueAppearance = 'arrow-circle';

  /** ARIA label to apply on the element.
   * @defaultValue 'Scroll down'
   */
  @Input() ariaLabel = 'Scroll down';

  /** Optional tooltip message to be shown upon hover. */
  @Input() tooltip?: string;
}
