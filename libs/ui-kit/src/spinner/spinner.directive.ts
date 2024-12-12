import { Directive } from '@angular/core';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material/progress-spinner';

@Directive({
  selector: '[qsSpinner]',
  providers: [
    {
      provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue: {
        diameter: 32,
      },
    },
  ],
})
export class QsSpinnerDirective {}
