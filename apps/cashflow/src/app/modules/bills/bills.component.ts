import { Component } from '@angular/core';

import { Navbar } from '../../components/navbar';

import { BillsList } from './bills-list/bills-list.component';

@Component({
  selector: 'app-bills',
  imports: [BillsList, Navbar],
  templateUrl: './bills.component.html',
})
export class Bills {}
