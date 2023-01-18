import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient) { }

  getCustomers() : Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.URL+'/customers');
  }

  createCustomer(customer:Customer) :Observable<String> {
    return this.http.post<String>(environment.URL + '/createCustomer', customer);
  }

  updateCustomer(customer:Customer) :Observable<String> {
    return this.http.put<String>(environment.URL + '/updateCustomer', customer);
  }

  deleteCustomer(id:number) :Observable<String> {
    return this.http.delete<String>(environment.URL + '/deleteCustomer/'+ id);
  }
}
