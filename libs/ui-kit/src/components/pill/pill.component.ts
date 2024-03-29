import { Component, input } from '@angular/core';

@Component({
  selector: 'qs-pill',
  standalone: true,
  templateUrl: './pill.component.html',
  styles: `
    .pill {
      font-size: 0.75rem;
      text-transform: uppercase;
      background-color: var(--pill-bg-color);
      color: var(--pill-text-color);
      padding: 2px 10px;
      border-radius: 2px;
    }
  `,
})
export class PillComponent {
  text = input.required<string>();
}
