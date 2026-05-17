import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { AccountDetails } from '../model/account.model';
import { Debit } from '../model/Debit.model';
import { Credit } from '../model/Credit.model';
import { Transfer } from '../model/transfer.model';
import { BankAccountCustomer } from '../model/account_customer.model';
import { SaveSaving } from '../model/SaveSaving.model';
import { SaveCurrent } from '../model/SaveCurrent.model';
@Injectable({
  providedIn: 'root',
})
export class Accountservice {

  constructor(private http:HttpClient) { }

  public getAccounts():Observable<any>{

    return this.http.get("http://localhost:8085/accounts");

  }

  public searcheAccount(id:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>("http://localhost:8085/accounts/"+id+"/pageOperations?page="+page+"&size="+size);
  }

  public Debit(debit:Debit):Observable<Debit>{
    return this.http.post<Debit>("http://localhost:8085/accounts/debit",debit);
  }
  public Credit(credit:Credit):Observable<Credit>{
    return this.http.post<Credit>("http://localhost:8085/accounts/credit",credit);
  }
  public Transfer(transfer:Transfer):Observable<Transfer>{
    return this.http.post<Transfer>("http://localhost:8085/accounts/transfer",transfer);
  }
  public deleteAccount(id:string):Observable<void>{
    return this.http.delete<void>("http://localhost:8085/customerAccountDelete/"+id);
  }
  public getAccountsByCustomer(id:number):Observable<Array<BankAccountCustomer>>{
    return this.http.get<Array<BankAccountCustomer>>("http://localhost:8085/customerAccounts/"+id);
  }
  public SaveSaving(savingacount:SaveSaving):Observable<BankAccountCustomer>{
    return this.http.post<BankAccountCustomer>("http://localhost:8085/newacount/saveSaving",savingacount);
  }
  public SaveCurrent(savingcurrent:SaveCurrent):Observable<BankAccountCustomer>{
    return this.http.post<BankAccountCustomer>("http://localhost:8085/newacount/SaveCurrent",savingcurrent);
  }
}
