import { Component, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { QsDialogService } from '@queso/ui-kit/dialog/public-api';

import { DressCodeDetails } from './dress-code-details/dress-code-details';

export interface DressCodeRole {
  value: string;
  label: string;
  name?: string;
  palette: { color: string; name: string }[][];
}

@Component({
  selector: 'app-dress-code',
  imports: [MatTooltip],
  templateUrl: './dress-code-page.html',
})
export class DressCodePage {
  private readonly dialogService = inject(QsDialogService);

  protected readonly roles: DressCodeRole[] = ROLES;

  showDressCodeDetails(role: DressCodeRole): void {
    this.dialogService.showCustomComponent(
      role.name ?? role.label,
      DressCodeDetails,
      { role },
      []
    );
  }
}

const ROLES: DressCodeRole[] = [
  {
    value: 'bridesmaids',
    label: 'Bridesmaids',
    palette: [
      [
        {
          color: '#8A8E75',
          name: 'Sage Green',
        },
        {
          color: '#A3A692',
          name: 'Soft Mist',
        },
        {
          color: '#B0B39E',
          name: 'Pale Sage',
        },
        {
          color: '#9C9F89',
          name: 'Muted Olive',
        },
        {
          color: '#787B65',
          name: 'Eucalyptus',
        },
      ],
    ],
  },
  { value: 'groomsmen', label: 'Groomsmen', palette: [] },
  {
    value: 'guests',
    label: 'Guests',
    palette: [
      [
        {
          color: '#EADBC8',
          name: 'Warm Beige',
        },
        {
          color: '#F5E8D7',
          name: 'Light Sand',
        },
        {
          color: '#F0D9B5',
          name: 'Champagne Cream',
        },
        {
          color: '#D9B897',
          name: 'Toasted Almond',
        },
      ],
      [
        {
          color: '#8B5E3B',
          name: 'Deep Mocha',
        },
        {
          color: '#A47550',
          name: 'Milk Chocolate',
        },
        {
          color: '#7A4F36',
          name: 'Chestnut Brown',
        },
        {
          color: '#5A3A2E',
          name: 'Espresso',
        },
      ],
      [
        {
          color: '#FDD4C6',
          name: 'Muted Blush',
        },
        {
          color: '#F4DBD2',
          name: 'Pale Petal',
        },
        {
          color: '#E8C7B8',
          name: 'Soft Apricot',
        },
        {
          color: '#D4A18C',
          name: 'Dusty Peach',
        },
      ],
      [
        {
          color: '#E59263',
          name: 'Terracotta',
        },
        {
          color: '#D98A66',
          name: 'Dusty Clay',
        },
        {
          color: '#C5764F',
          name: 'Amberwood',
        },
        {
          color: '#C26F51',
          name: 'Toasted Coral',
        },
      ],
    ],
  },
  {
    value: 'principal-sponsors',
    label: 'Ninongs & Ninangs',
    name: 'Principal Sponsors',
    palette: [
      [
        {
          color: '#E6B8A2',
          name: 'Soft Peach',
        },
        {
          color: '#E3C5A8',
          name: 'Champagne Beige',
        },
        {
          color: '#E1A58E',
          name: 'Pale Terracotta',
        },
        {
          color: '#DEAB87',
          name: 'Muted Apricot',
        },
      ],
    ],
  },
  {
    value: 'secondary-sponsors',
    label: 'Symbol Bearers',
    name: 'Secondary Sponsors',
    palette: [
      [
        {
          color: '#B06148',
          name: 'Warm Clay',
        },
        {
          color: '#9E5C46',
          name: 'Rust Brown',
        },
        {
          color: '#A56A50',
          name: 'Muted Copper',
        },
        {
          color: '#8F4D38',
          name: 'Rust Umber',
        },
      ],
    ],
  },
];
