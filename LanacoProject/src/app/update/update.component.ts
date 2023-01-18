import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Seller } from '../models/seller.model';
import { CustomerService } from '../services/customer.service';
import { InvoiceService } from '../services/invoice.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  customer :Customer= new Customer();
  customers: Customer[]=[];
  seller: Seller= new Seller();
  sellers:Seller[]=[];
  invoice: Invoice= new Invoice();
  invoices:Invoice[]=[];
  constructor( private router: Router,private customerservice:CustomerService,private sellerservice:SellerService,private invoiceService:InvoiceService) { }
  isActive!:boolean;
  sellerName!:string;
  customerName!:string;
  isActiveIndicator!: boolean;
  sellerNameIndicator!: boolean;
  customerNameIndicator!: boolean;

  updateCustomerForm = new FormGroup({
    Name : new FormControl( "",Validators.required),
    Surname : new FormControl("", Validators.required),
    Address : new FormControl("", Validators.required),
    Age : new FormControl(30, Validators.required),
  });

  updateSellerForm = new FormGroup({
    CompanyName : new FormControl( "",Validators.required),
    HqAddress : new FormControl("", Validators.required),
    IsActive : new FormControl("", Validators.required),

  });

  updateInvoiceForm = new FormGroup({
    SellerName : new FormControl( "",Validators.required),
    CustomerName : new FormControl("", Validators.required),
    Date : new FormControl("", Validators.required),
    Amount : new FormControl("", Validators.required),

  });
  ngOnInit(): void {
    this.isActiveIndicator=false;
    this.sellerNameIndicator=false;
    this.customerNameIndicator=false;
    this.customer=JSON.parse(localStorage.getItem('selectedCustomer')!);
    this.customers=JSON.parse(localStorage.getItem('customers')!);
    this.seller=JSON.parse(localStorage.getItem('selectedSeller')!);
    this.sellers=JSON.parse(localStorage.getItem('sellers')!);
    this.invoice=JSON.parse(localStorage.getItem('selectedInvoice')!);
    this.invoices=JSON.parse(localStorage.getItem('invoices')!);

    if(localStorage.getItem('idicator')=='customers'){
      this.updateCustomerForm.controls['Name'].setValue(this.customer.name);
      this.updateCustomerForm.controls['Surname'].setValue(this.customer.surname);
      this.updateCustomerForm.controls['Address'].setValue(this.customer.address);
      this.updateCustomerForm.controls['Age'].setValue(this.customer.age);
    }
    else if(localStorage.getItem('idicator')=='sellers'){
      this.updateSellerForm.controls['CompanyName'].setValue(this.seller.companyName);
      this.updateSellerForm.controls['HqAddress'].setValue(this.seller.hqAddress);
      this.updateSellerForm.controls['IsActive'].setValue(this.seller.isActive);
      }
    else if(localStorage.getItem('idicator')=='invoices'){
       this.updateInvoiceForm.controls['SellerName'].setValue(this.invoice.sellerName);
       this.updateInvoiceForm.controls['CustomerName'].setValue(this.invoice.customerName);
       this.updateInvoiceForm.controls['Date'].setValue(this.invoice.date);
       this.updateInvoiceForm.controls['Amount'].setValue(this.invoice.amount);
      }
 }
 updateCustomer(){
    this.customers.forEach(element => {
      if(element.id==this.customer.id){
          element.name=this.updateCustomerForm.controls['Name'].value;
          element.surname = this.updateCustomerForm.controls['Surname'].value;
          element.address = this.updateCustomerForm.controls['Address'].value;
          element.age = this.updateCustomerForm.controls['Age'].value;
        this.customerservice.updateCustomer(element).subscribe(data =>{})
      }
    });

    localStorage.setItem('customers', JSON.stringify(this.customers));
    this.router.navigateByUrl('/customers');
  }

  updateSeller(){
    this.sellers.forEach(element => {
      if(element.id==this.seller.id){
          element.companyName= this.updateSellerForm.controls['CompanyName'].value;
          element.hqAddress = this.updateSellerForm.controls['HqAddress'].value;
        if(this.isActiveIndicator==true){
          element.isActive =  this.isActive;
        }
        else{
          element.isActive =  this.seller.isActive;
        }
        this.sellerservice.updateSeller(element).subscribe(data =>{})
      }
     });
    localStorage.setItem('sellers', JSON.stringify(this.sellers));
    this.router.navigateByUrl('/sellers');
 }

  updateInvoice(){
    this.invoices.forEach(element => {
      if(element.id==this.invoice.id){
        if(this.sellerNameIndicator==true){
            element.sellerName =  this.sellerName;
        }
        else{
            element.sellerName =  this.invoice.sellerName;
        }

      if(this.customerNameIndicator==true){
            element.customerName =  this.customerName;
      }
      else{
        element.customerName =  this.invoice.customerName;
      }
      element.date =  this.updateInvoiceForm.controls['Date'].value;
      element.amount =  this.updateInvoiceForm.controls['Amount'].value;
      this.invoiceService.updateInvoice(element).subscribe(data =>{})
     }
     });
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    this.router.navigateByUrl('/invoices');


  }

 getIncicator(){
    return localStorage.getItem('idicator')
  }

  onSelectedIsActive(value:string):void{
    this.isActiveIndicator=true;
    this.isActive=(/true/i).test(value);
  }

  onSelectedSellerName(value:string):void{
    this.sellerNameIndicator=true;
    this.sellerName=value;
  }

   onSelectedCustomerName(value:string):void{
      this.customerNameIndicator=true;
      this.customerName=value;
   }

}
