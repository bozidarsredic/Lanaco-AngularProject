import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Seller } from '../models/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor( private http: HttpClient) { }

  getSellers() : Observable<Seller[]> {
    return this.http.get<Seller[]>(environment.URL+'/sellers');
  }

  createSeller(seller:Seller) :Observable<String> {
    return this.http.post<String>(environment.URL + '/createSeller', seller);
  }

  updateSeller(seller:Seller) :Observable<String> {
    return this.http.put<String>(environment.URL + '/updateSeller', seller);
  }

  deleteSeller(id:number) :Observable<String> {
    return this.http.delete<String>(environment.URL + '/deleteSeller/'+ id);
  }
}
