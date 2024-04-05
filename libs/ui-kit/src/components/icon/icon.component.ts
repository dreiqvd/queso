import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'qs-icon',
  standalone: true,
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
export class IconComponent implements OnChanges {
  /** Name of the icon to display. */
  iconName = input.required<string>();

  /**
   * The type of icon style to use.
   * @defaultValue 'light'
   */
  iconStyle = input<IconStyle>('regular');

  /** Size of the icon in px. */
  iconSize = input<number>(24);

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

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
