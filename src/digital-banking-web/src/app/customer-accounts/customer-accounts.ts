import { Component,ChangeDetectorRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankAccountCustomer } from '../model/account_customer.model';
import { Accountservice } from '../services/accountservice';
import { Customer } from '../model/customer.model';
import { Customerservice } from '../services/customerservice';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification-service';

@Component({
  selector: 'app-customer-accounts',
  imports: [ NgIf, NgFor],
  templateUrl: './customer-accounts.html',
  styleUrl: './customer-accounts.css',
})

export class CustomerAccounts implements OnInit {

  customerId!: number;
  customer!: Customer;
  AccountCustomer!:Array<BankAccountCustomer>;

  constructor(private routeA: ActivatedRoute,private accountserver:Accountservice,private customerservice:Customerservice,private cdr: ChangeDetectorRef,private router:Router,public auths:AuthentificationService) {}

  ngOnInit(): void {


    this.customerId=this.routeA.snapshot.params['id'];
    this.customerservice.getCustomer(this.customerId).subscribe({
      next: (data)=>{
        this.customer=data;
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log(err);
      }
    });
    this.accountserver.getAccountsByCustomer(this.customerId).subscribe({
      next: (data)=>{
        this.AccountCustomer=data;
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  AccountOperation(a:BankAccountCustomer){
    this.router.navigateByUrl("/admin/accounts/"+a.id);
  }

  deleteAccount(accountId:string){
    if(confirm("Are you sure you want to delete this account?")){
      this.accountserver.deleteAccount(accountId).subscribe({
      next: (data)=>{
        this.ngOnInit();
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log(err);
        this.cdr.detectChanges();
      }
    })
    }
  }

}
