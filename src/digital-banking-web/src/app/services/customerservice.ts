import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Customer } from '../model/customer.model';
import { Customers } from '../customers/customers';
@Injectable({
  providedIn: 'root',
})
export class Customerservice {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>("http://localhost:8085/customers");
  }
  public getCustomer(id:number):Observable<Customer>{
    return this.http.get<Customer>("http://localhost:8085/customers/"+id);
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>("http://localhost:8085/customers/Search?KeyWord="+keyword);
  }
  public saveCustomer(Customers:Partial<Customer>):Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8085/customers",Customers);
  }
  public UpdateCustomer(id:number,customer:Customer):Observable<Customer>{
    return this.http.put<Customer>("http://localhost:8085/customersUpdate/"+id,customer);
  }
  public deleteCustomer(id:number):Observable<void>{
    return this.http.delete<void>("http://localhost:8085/customers/"+id);

  }
}
