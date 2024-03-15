import { Component, input, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'qs-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styles: `
    :host {
      // Remove additional space when rendering the icon
      line-height: 0;
      display: inline-block;
    }
  `,
})
export class IconComponent implements OnInit {
  /** Name of the icon to display. */
  iconName = input.required<string>();

  /**
   * The type of icon style to use.
   * @defaultValue 'light'
   */
  iconStyle = input<IconStyle>('light');

  /** Size of the icon in px. */
  iconSize = input<number>(24);

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
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
