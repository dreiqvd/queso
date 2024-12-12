import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'qs-icon',
  imports: [MatIcon],
  templateUrl: './icon.component.html',
  styles: `
    :host {
      // Remove additional space when rendering the icon
      line-height: 0;
      display: inline-block;
    }
  `,
})
export class QsIconComponent implements OnChanges {
  // Dependencies
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  /** Name of the icon to display. */
  readonly iconName = input.required<string>();

  /**
   * The type of icon style to use.
   * @defaultValue 'light'
   */
  readonly iconStyle = input<IconStyle>('regular');

  /** Size of the icon in px. */
  readonly iconSize = input<number>(24);

  ngOnChanges(changes: SimpleChanges): void {
    // For now, icon needs to be loaded only when the iconName changes.
    // No use case yet for changing the iconStyle or iconSize.
    if (changes['iconName']) {
      this.loadIcon();
    }
  }

  private loadIcon(): void {
    this.iconRegistry.addSvgIcon(
      this.iconName(),
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `/assets/icons/${this.iconStyle()}/${this.iconName()}.svg`
      )
    );
  }
}

export type IconStyle =
  | 'brands'
  | 'duotone'
  | 'light'
  | 'regular'
  | 'solid'
  | 'custom';
