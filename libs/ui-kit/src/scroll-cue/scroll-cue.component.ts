import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

type ScrollCueAppearance = 'mouse' | 'arrow-circle' | 'arrow' | 'chevron';

@Component({
  selector: 'qs-scroll-cue',
  imports: [NgClass, MatTooltip],
  templateUrl: './scroll-cue.component.html',
  styleUrl: './scroll-cue.component.scss',
})
export class QsScrollCue {
  /** Appearance type of the scroll cue.
   *  @defaultValue 'arrow-circle'
   */
  readonly appearance = input<ScrollCueAppearance>('arrow-circle');

  /** ARIA label to apply on the element.
   * @defaultValue 'Scroll down'
   */
  readonly ariaLabel = input<string>('Scroll down');

  /** Optional tooltip message to be shown upon hover. */
  readonly tooltip = input<string>();
}
