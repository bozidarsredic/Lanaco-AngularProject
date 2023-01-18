import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SellersComponent } from './sellers/sellers.component';
import { CreateCustomerComponent } from './create/create-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';

import { HttpClientModule } from '@angular/common/http';
import { SellerService } from './services/seller.service';
import { ToastrModule } from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    SellersComponent,
    CustomersComponent,
    CreateCustomerComponent,
    DeleteComponent,
    UpdateComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
   ],
  providers: [
    CustomerService,
   SellerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
