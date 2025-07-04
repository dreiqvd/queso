import { Component, input } from '@angular/core';

@Component({
  selector: 'qs-pill',
  templateUrl: './pill.component.html',
  styles: `
    .pill {
      font-size: 0.75rem;
      background-color: var(--pill-bg-color);
      color: var(--pill-text-color);
      padding: 2px 10px;
      border-radius: 4px;
    }
  `,
})
export class QsPill {
  readonly text = input.required<string>();
}
