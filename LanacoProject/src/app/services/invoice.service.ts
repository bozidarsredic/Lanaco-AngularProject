import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor( private http: HttpClient) { }

  getInvoices() : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(environment.URL+'/invoices');
  }

  createInvoice(invoice:Invoice) :Observable<String> {
    return this.http.post<String>(environment.URL + '/createInvoice', invoice);
  }

  updateInvoice(invoice:Invoice) :Observable<String> {
    return this.http.put<String>(environment.URL + '/updateInvoice', invoice);
  }

  deleteInvoice(id:number) :Observable<String> {
    return this.http.delete<String>(environment.URL + '/deleteInvoice/'+ id);
  }


}
