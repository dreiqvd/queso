import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QsPageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const routerTitle = this.buildTitle(routerState);
    let title = 'Drei Q.';
    if (routerTitle !== undefined) {
      title = title.concat(' | ', routerTitle);
    }
    this.title.setTitle(title);
  }
}
