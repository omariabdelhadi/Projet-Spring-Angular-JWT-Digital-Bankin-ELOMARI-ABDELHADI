import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 👈 OnInit
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NgIf, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customer } from '../model/customer.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Customerservice } from '../services/customerservice';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomerUpdate } from '../customer-update/customer-update';
import { AuthentificationService } from '../services/authentification-service';

@Component({
  selector: 'app-customers',
  imports: [NgFor,NgIf,JsonPipe,ReactiveFormsModule,RouterLink],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit, OnDestroy {

  customers : Array<Customer> = [];
  errorMessage! : string;
  searchformGroup!: FormGroup;
  private destroy$ = new Subject<void>();
  constructor(private custserver:Customerservice,private fb:FormBuilder, private cdr: ChangeDetectorRef,private router:Router,public auths:AuthentificationService){}

  ngOnInit(): void{
    this.searchformGroup = this.fb.group({
      keyWord: this.fb.control("")
    });
    this.custserver.getCustomers().pipe(takeUntil(this.destroy$)).subscribe({
    next: (data)=>{
      this.customers=data;
      this.cdr.detectChanges();
    },
    error: (err)=>{
      this.errorMessage=err;
      this.cdr.detectChanges();
    }
  });
  }


  getCustmersByKeyword(){
    let keyword = this.searchformGroup?.value.keyWord;
    this.custserver.searchCustomers(keyword).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data)=>{
        this.customers=data;
        this.cdr.detectChanges();
        },
      error: (err)=>{
        this.errorMessage=err;
        this.cdr.detectChanges();
        }
      });
  }

  deleteCustomer(id:number){
    if(confirm("Are you sure you want to delete this customer?")){
      this.custserver.deleteCustomer(id).subscribe({
      next: (data)=>{
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    })
  }
  }

  customerAccount(customer:Customer){
    this.router.navigateByUrl("/admin/customerAccounts/"+customer.id);
  }
  customerUpdate(customer:Customer){
    this.router.navigateByUrl("/admin/customerUpdate/"+customer.id);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
