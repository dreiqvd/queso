import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type ScrollCueAppearance = 'mouse' | 'arrow-circle' | 'arrow' | 'chevron';

@Component({
  selector: 'qs-scroll-cue',
  standalone: true,
  imports: [NgClass],
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
}
