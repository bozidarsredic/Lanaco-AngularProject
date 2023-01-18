// import { Component, OnInit } from '@angular/core';
// import { Invoice } from '../models/invoice.model';

// @Component({
//   selector: 'app-invoices',
//   templateUrl: './invoices.component.html',
//   styleUrls: ['./invoices.component.css']
// })
// export class InvoicesComponent implements OnInit {

//   constructor() { }
//   invoices: Invoice[]=[];

//   ngOnInit(): void {
//     localStorage.setItem('idicator',"invoices");
//     this.invoices=JSON.parse(localStorage.getItem('invoices')!);
//   }
// }




import { Customer } from '../models/customer.model';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  invoices: Invoice[]=[];

    colDefs: ColDef[] = [
    { field: 'sellerName'},
    { field: 'customerName'},
    { field: 'date'},
    { field: 'amount'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
     localStorage.setItem('idicator',"invoices");
     this.invoices=JSON.parse(localStorage.getItem('invoices')!);
     localStorage.setItem('selectedInvoice', JSON.stringify(null));
 }

  onCellClicked(event: CellClickedEvent){
    localStorage.setItem('selectedInvoice', JSON.stringify(event.data));

   }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular

  clearSelection(){
    this.agGrid.api.deselectAll();
  }

}
