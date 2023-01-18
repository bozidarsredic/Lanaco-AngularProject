
import { Customer } from '../models/customer.model';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {



  customers: Customer[]=[];



  colDefs: ColDef[] = [
    { field: 'name'},
    { field: 'surname'},
    { field: 'address'},
    { field: 'age'}
  ];




  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
     localStorage.setItem('idicator',"customers");
     this.customers=JSON.parse(localStorage.getItem('customers')!);
     localStorage.setItem('selectedCustomer', JSON.stringify(null));
   //  localStorage.setItem('enable',JSON.stringify(true));

   //localStorage.setItem('invoices', JSON.stringify([]));

  }



  onCellClicked(event: CellClickedEvent){
    localStorage.setItem('selectedCustomer', JSON.stringify(event.data));

   }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular

  clearSelection(){
    this.agGrid.api.deselectAll();
  }

}
