import { Directive } from '@angular/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';

@Directive({
  standalone: true,
  selector: '[qsTabGroup]',
  providers: [
    {
      provide: MAT_TABS_CONFIG,
      useValue: {
        stretchTabs: false,
      },
    },
  ],
})
export class QsTabGroupDirective {}
