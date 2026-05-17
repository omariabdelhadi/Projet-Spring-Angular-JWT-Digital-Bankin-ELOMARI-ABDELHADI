import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Accountservice } from '../services/accountservice';
import { Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDetails } from '../model/account.model';
import { Debit } from '../model/Debit.model';
import { Credit } from '../model/Credit.model';
import { Transfer } from '../model/transfer.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthentificationService } from '../services/authentification-service';
@Component({
  selector: 'app-accounts',
  imports: [NgFor, NgIf, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit{

  account! : AccountDetails;
  errorMessage! : string;
  selectAccountForm!: FormGroup;
  OperationForm!: FormGroup;
  CurrentPage : number = 0;
  size : number = 5;
  private destroy$ = new Subject<void>();

  constructor(private accountserver:Accountservice, private cdr: ChangeDetectorRef,private fb:FormBuilder,private routerA:ActivatedRoute,public auths:AuthentificationService){}

  ngOnInit(): void{
    
    
    this.selectAccountForm = this.fb.group({
      AccountId: this.fb.control("")
    })
    this.OperationForm=this.fb.group({

      Operationtype: this.fb.control("",[Validators.required]),
      amount: this.fb.control(0, [Validators.required, Validators.min(1)]),
      description: this.fb.control("",[Validators.required]),
      AccountsIdDestination: this.fb.control("")
    })

    this.OperationForm.get('Operationtype')?.valueChanges.subscribe(value => {
      const destControl = this.OperationForm.get('AccountsIdDestination');
      if (value === 'TRANSFER') {
        destControl?.setValidators([Validators.required]);
      } else {
        destControl?.clearValidators();
      }
      destControl?.updateValueAndValidity();
    });

    let id = this.routerA.snapshot.params['id'];
    if(id){
      this.selectAccountForm.get('AccountId')?.setValue(id);
      this.chercheAccount();
    }
  }
  chercheAccount(){
    let id = this.selectAccountForm?.value.AccountId;
    this.accountserver.searcheAccount(id,this.CurrentPage,this.size).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data)=>{
        this.account=data;
        this.cdr.detectChanges();
        },
      error: (err)=>{
        this.errorMessage=err;
        this.cdr.detectChanges();
        }
      });
  }
  
  getPages(): number[] {
    return Array.from({length: this.account?.totalePage || 0}, (_, i) => i);
  }
  
  gotoPage(page:number){
    this.CurrentPage=page;
    this.chercheAccount();
  }

  OperationAccount(){
    let operationType=this.OperationForm?.value.Operationtype;
    let amount=this.OperationForm?.value.amount;
    let description=this.OperationForm?.value.description;
    if(operationType=="DEBIT"){
      let debit : Debit ={accountId: this.selectAccountForm?.value.AccountId,amount: amount, description: description}
      this.accountserver.Debit(debit).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data)=>{
          this.OperationForm.reset();
          this.chercheAccount();
          this.cdr.detectChanges();
        },
        error: (err)=>{
          alert("le montant doit etre inferieur ou egale au solde du compte");
          this.cdr.detectChanges();
        }
      })
    }
    else if(operationType=="CREDIT"){
      let credit : Credit ={accountId: this.selectAccountForm?.value.AccountId,amount: amount, description: description}
      this.accountserver.Credit(credit).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data)=>{
          this.OperationForm.reset();
          this.chercheAccount();
          this.cdr.detectChanges();
        },
        error: (err)=>{
          alert(err.message);
          this.cdr.detectChanges();
        }
      })
    }
    else if(operationType=="TRANSFER"){

      let accountIdDestination=this.OperationForm?.value.AccountsIdDestination;
      let transfer : Transfer ={accountIdS: this.selectAccountForm?.value.AccountId,accountIdd: accountIdDestination,amount: amount}
      this.accountserver.Transfer(transfer).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data)=>{
          
          alert("Transfer successful");
          this.OperationForm.reset();
          this.chercheAccount();
          this.cdr.detectChanges();
        },
        error: (err)=>{
          alert(err.message);
          this.cdr.detectChanges();
        }
      })
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
