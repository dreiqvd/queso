import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QsSlidebarService {
  isSidebarOpen = signal(false);

  openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
    console.log('Sidebar closed');
  }
}
