import {
  afterRenderEffect,
  Directive,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { getViewportHeight } from '@queso/common';

/** A class/directive for handling generic table methods and properties */
@Directive({
  selector: '[appBaseTable]',
})
export class BaseTableDirective<T> {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableWrapper') tableWrapper!: ElementRef<HTMLDivElement>;

  private readonly renderer2 = inject(Renderer2);

  readonly tblDataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  tblColumns: string[] = [];

  constructor() {
    afterRenderEffect(() => {
      this.tblDataSource.sort = this.sort;

      setTimeout(() => {
        const tableWrapper = this.tableWrapper.nativeElement;
        const yOffset = tableWrapper.getBoundingClientRect().top;
        const height = getViewportHeight() - yOffset - 32;
        this.renderer2.setStyle(tableWrapper, 'height', `${height}px`);
      });
    });
  }
}
