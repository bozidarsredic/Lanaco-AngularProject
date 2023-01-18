import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from './models/customer.model';
import { Invoice } from './models/invoice.model';
import { Seller } from './models/seller.model';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   implements OnInit{
  title = 'LanacoProject';

  deleteEnable: boolean= true;
  public disabled = true;

  constructor(private customerService:CustomerService,private sellerService:SellerService,private invoiceService:InvoiceService,private router: Router ) { }

  ngOnInit(): void {

    localStorage.setItem('idicator',"invoices");

    this.customerService.getCustomers().subscribe(
      (data:Customer[]) =>{
        localStorage.setItem('customers', JSON.stringify(data));
      });

    this.sellerService.getSellers().subscribe(
        (data:Seller[]) =>{
          localStorage.setItem('sellers', JSON.stringify(data));
        });
    this.invoiceService.getInvoices().subscribe(
          (data:Invoice[]) =>{
            localStorage.setItem('invoices', JSON.stringify(data));
          });
  }

  getEnable(){
   if( localStorage.getItem('idicator')==='customers'){
        if(JSON.parse(localStorage.getItem('selectedCustomer')!)==null){
          return  true;
        }
        else{
          return false;
        }
    }
    else if( localStorage.getItem('idicator')==='sellers'){
        if(JSON.parse(localStorage.getItem('selectedSeller')!)==null){
          return  true;
        }
        else{
          return false;
        }
     }
    else if( localStorage.getItem('idicator')==='invoices'){
        if(JSON.parse(localStorage.getItem('selectedInvoice')!)==null){
          return  true;
        }
        else{
          return false;
        }
  }
     return true;
  }

  getIncicator(){
    return localStorage.getItem('idicator')
  }

  getId(){
    if(this.getIncicator()=="customers"){
      let customer: Customer;
      customer=JSON.parse(localStorage.getItem('selectedCustomer')!);
      return customer.id
    }
    else if(this.getIncicator()=="sellers"){
      let seler: Seller;
      seler=JSON.parse(localStorage.getItem('selectedSeller')!);
       return seler.id
      }
    else if(this.getIncicator()=="invoices"){
       let invoice: Invoice;
       invoice=JSON.parse(localStorage.getItem('selectedInvoice')!);
       return invoice.id
     }
   return 1;
  }

  update(){
    this.router.navigateByUrl('/'+ this.getIncicator()+'/'+this.getId());
  }
}





