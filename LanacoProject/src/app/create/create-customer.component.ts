import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Seller } from '../models/seller.model';
import { CustomerService } from '../services/customer.service';
import { InvoiceService } from '../services/invoice.service';
import { SellerService } from '../services/seller.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createCustomerForm = new FormGroup({
    Name : new FormControl("Pera", [Validators.required, Validators.minLength(1) ]),
    Surname : new FormControl("Peric", Validators.required),
    Address : new FormControl("Blevar", Validators.required),
    Age : new FormControl(30, Validators.required),
  });
  createInvoicesForm = new FormGroup({
    SellerName : new FormControl(),
    CustomerName : new FormControl(),
    Date : new FormControl("2022-11-12"),
    Amount : new FormControl(30,Validators.required),
  });
  createSellersForm = new FormGroup({
    CompanyName : new FormControl("IMB", Validators.required ),
    HqAddress : new FormControl("Prvomajska", Validators.required),
    IsActive : new FormControl(true, Validators.minLength(5)),

  });
  customers: Customer[]=[];
  sellers: Seller[]=[];
  invoices: Invoice[]=[];
   sellerName:string="";
   customerName:string="";
   sellerId:number=1
   customerId:number=1
   isActive:boolean=true;
   seller: Seller[]=[];

   today= new Date();
   todaysDataTime = '';

  constructor(private customerservice:CustomerService,private sellerservice:SellerService, private router: Router,private toastr: ToastrService,private invoiceService:InvoiceService) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
   }

  ngOnInit(): void {


    this.customers=JSON.parse(localStorage.getItem('customers')!);
    this.sellers=JSON.parse(localStorage.getItem('sellers')!);
    this.invoices=JSON.parse(localStorage.getItem('invoices')!);
    this.sellerName=this.sellers[0].companyName;
    this.customerName=this.customers[0].name;




  }
  createInvoice(){
      let newInvoice:Invoice= new  Invoice();

      if(this.invoices.length==0){
        newInvoice.id= 0
      }
      else{
        newInvoice.id= this.invoices[this.invoices.length-1].id+1
      }

      newInvoice.sellerName = this.sellerName
      newInvoice.customerName = this.customerName
      newInvoice.customerId= this.customerId;
      newInvoice.sellerId=this.sellerId;


      newInvoice.date = this.createInvoicesForm.controls['Date'].value;
      newInvoice.amount = this.createInvoicesForm.controls['Amount'].value;
      this.seller= this.sellers.filter(s=>s.companyName===this.sellerName)
      let  date= new Date(newInvoice.date )
      let  date2= new Date(Date.now())

      if(newInvoice.amount<=0){
        this.toastr.error("The invoice amount must be greater than 0!");
      }
      else if(this.seller[0].isActive==false){
        this.toastr.error("Seller must be active!");
      }
      else if( date>date2){
        this.toastr.error("Date is not valid");
      }
      else{
        this.invoices.push(newInvoice)
        localStorage.setItem('invoices', JSON.stringify(this.invoices));

        this.invoiceService.createInvoice(newInvoice).subscribe(data =>{})
        this.router.navigateByUrl('/invoices');
      }


  }

  createCustomer(){
    let newCustomer:Customer= new  Customer();
        if(this.customers.length==0){
      newCustomer.id= 0
    }
    else{
      newCustomer.id= this.customers[this.customers.length-1].id+1
    }
    newCustomer.name = this.createCustomerForm.controls['Name'].value;
    newCustomer.surname = this.createCustomerForm.controls['Surname'].value;
    newCustomer.address = this.createCustomerForm.controls['Address'].value;
    newCustomer.age = this.createCustomerForm.controls['Age'].value;
    this.customers.push(newCustomer)
    localStorage.setItem('customers', JSON.stringify(this.customers));

    this.customerservice.createCustomer(newCustomer).subscribe(data =>{})

      this.router.navigateByUrl('/customers');


  }
  createSeller(){
    let newSeller:Seller= new  Seller();

    if(this.sellers.length==0){
      newSeller.id= 0
    }
    else{
      newSeller.id= this.sellers[this.sellers.length-1].id+1
    }
    newSeller.companyName = this.createSellersForm.controls['CompanyName'].value;
    newSeller.hqAddress = this.createSellersForm.controls['HqAddress'].value;
    newSeller.isActive = this.isActive;
    this.sellers.push(newSeller)
    localStorage.setItem('sellers', JSON.stringify(this.sellers));

    this.sellerservice.createSeller(newSeller).subscribe(data =>{})

    this.router.navigateByUrl('/sellers');

  }
  onSelectedSellerName(value:string):void{
   var splicd= value.split(".")
   this.sellerId=Number(splicd[0]);

  this.sellerName=splicd[1];

  }

  onSelectedCustomerName(value:string):void{
    var splicd= value.split(".")
    this.customerId=Number(splicd[0]);
    this.customerName=splicd[1];
    }

    onSelectedIsActive(value:string):void{
     this.isActive=(/true/i).test(value);
   }

  getIncicator(){

    return localStorage.getItem('idicator')
  }


}
