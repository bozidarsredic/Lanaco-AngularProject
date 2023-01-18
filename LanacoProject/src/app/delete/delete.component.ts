import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Seller } from '../models/seller.model';
import { CustomerService } from '../services/customer.service';
import { InvoiceService } from '../services/invoice.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private sellerservice:SellerService,private router: Router,private customerservice:CustomerService,private invoiceService:InvoiceService,private toastr: ToastrService) { }
  customers: Customer[]=[];
  newcustomers: Customer[]=[];
  customer :Customer= new Customer();
  sellers:Seller[]=[];
  newSellers:Seller[]=[];
  seller: Seller=new Seller();
  invoices:Invoice[]=[];
  newInvoices:Invoice[]=[];
  invoice: Invoice=new Invoice();
  canDeletecustomer!:boolean;
  canDeleteSeller!:boolean;
  ngOnInit(): void {
    this.invoices=JSON.parse(localStorage.getItem('invoices')!);
    this.canDeletecustomer=true;
    this.canDeleteSeller=true;
 }
  Cancel(){
    this.router.navigateByUrl('/'+localStorage.getItem('idicator'));
  }

  Delete(){

    if(localStorage.getItem('idicator')=='customers'){
      this.customer=JSON.parse(localStorage.getItem('selectedCustomer')!);
      this.customers=JSON.parse(localStorage.getItem('customers')!);

      this.invoices.forEach(element => {
        if(this.customer.id==element.customerId){
          this.canDeletecustomer=false
        }
     });

      if(this.canDeletecustomer==false){
        this.toastr.error("the customer exists on the invoice");
        this.router.navigateByUrl('/'+localStorage.getItem('idicator'));
      }
      else{
        this.customers.forEach(element => {

          if(element.id!=this.customer.id){
            this.newcustomers.push(element)
            this.router.navigateByUrl('/'+localStorage.getItem('idicator'));

          }
        });
        localStorage.setItem('customers', JSON.stringify(this.newcustomers));
        this.customerservice.deleteCustomer(this.customer.id).subscribe(data =>{})
      }

    }

    else if(localStorage.getItem('idicator')=='sellers'){
      this.seller=JSON.parse(localStorage.getItem('selectedSeller')!);
      this.sellers=JSON.parse(localStorage.getItem('sellers')!);

      this.invoices.forEach(element => {
        if(this.seller.id==element.sellerId){
        this.canDeleteSeller=false
        }
     });

      if(this.canDeleteSeller==false){
        this.toastr.error("the seller exists on the invoice");
        this.router.navigateByUrl('/'+localStorage.getItem('idicator'));
      }
      else{
        this.sellers.forEach(element => {

          if(element.id!=this.seller.id){
            this.newSellers.push(element)

          }
        });
        localStorage.setItem('sellers', JSON.stringify(this.newSellers));
        this.sellerservice.deleteSeller(this.seller.id).subscribe(data =>{})
      }
    }
    else if(localStorage.getItem('idicator')=='invoices'){
      this.invoice=JSON.parse(localStorage.getItem('selectedInvoice')!);
      this.invoices=JSON.parse(localStorage.getItem('invoices')!);
      this.invoices.forEach(element => {

      if(element.id!=this.invoice.id){
        this.newInvoices.push(element)

        }
      });
      localStorage.setItem('invoices', JSON.stringify(this.newInvoices));
      this.invoiceService.deleteInvoice(this.invoice.id).subscribe(data =>{})
    }
    this.router.navigateByUrl('/'+localStorage.getItem('idicator'));
  }
}
