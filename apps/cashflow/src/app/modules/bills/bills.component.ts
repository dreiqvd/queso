import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

import { BillsListComponent } from './bills-list/bills-list.component';

@Component({
  selector: 'app-bills',
  imports: [BillsListComponent, NavbarComponent],
  templateUrl: './bills.component.html',
})
export class BillsComponent {}
