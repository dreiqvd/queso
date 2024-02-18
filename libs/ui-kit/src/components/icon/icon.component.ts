import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'qs-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnInit {
  /** Name of the icon to display. */
  @Input({ required: true }) iconName!: string;

  /**
   * The type of icon style to use.
   * @defaultValue 'light'
   */
  @Input() iconStyle:
    | 'brands'
    | 'duotone'
    | 'light'
    | 'regular'
    | 'solid'
    | 'custom' = 'light';

  /** Size of the icon in px. */
  @Input() iconSize = 24;

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon(
      this.iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../../assets/icons/${this.iconStyle ? this.iconStyle : 'light'}/${
          this.iconName
        }.svg`
      )
    );
  }
}
