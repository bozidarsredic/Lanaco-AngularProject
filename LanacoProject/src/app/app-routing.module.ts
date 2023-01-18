import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from './create/create-customer.component';
import { CustomersComponent } from './customers/customers.component';
import { DeleteComponent } from './delete/delete.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SellersComponent } from './sellers/sellers.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'',component: InvoicesComponent},
  {path:'invoices',component: InvoicesComponent},
  {path:'customers',component: CustomersComponent},
  {path:'sellers',component: SellersComponent},
  {path:'customers/:id',component: UpdateComponent},
  {path:'sellers/:id',component: UpdateComponent},
  {path:'invoices/:id',component: UpdateComponent},
  {path:'sellers/:id',component: UpdateComponent},
  {path:'createCustomer',component: CreateCustomerComponent},
  {path:'delete',component: DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
