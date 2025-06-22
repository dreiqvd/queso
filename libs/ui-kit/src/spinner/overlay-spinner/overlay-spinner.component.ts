import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'qs-overlay-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './overlay-spinner.component.html',
  styleUrl: './overlay-spinner.component.scss',
})
export class QsOverlaySpinner {
  diameter = signal(32);
  color = signal<'primary' | 'accent'>('primary');
}
