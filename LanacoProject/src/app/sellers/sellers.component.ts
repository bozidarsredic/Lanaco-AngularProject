
import { Customer } from '../models/customer.model';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { Seller } from '../models/seller.model';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {

   sellers: Seller[]=[];

   colDefs: ColDef[] = [
    { field: 'companyName'},
    { field: 'hqAddress'},
    { field: 'isActive'},
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
     localStorage.setItem('idicator',"sellers");
     this.sellers=JSON.parse(localStorage.getItem('sellers')!);
     localStorage.setItem('selectedSeller', JSON.stringify(null));
  }

  onCellClicked(event: CellClickedEvent){
    localStorage.setItem('selectedSeller', JSON.stringify(event.data));
   }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular

  clearSelection(){
    this.agGrid.api.deselectAll();
  }

}
