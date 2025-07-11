import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly menuBtnColor = signal('var(--color-primary)');

  updateMenuBtnColor(color: string): void {
    this.menuBtnColor.set(color);
  }
}
