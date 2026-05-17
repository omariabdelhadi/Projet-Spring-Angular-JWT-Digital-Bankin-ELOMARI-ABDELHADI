import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SaveCurrent } from '../model/SaveCurrent.model';
import { Accountservice } from '../services/accountservice';
import { SaveSaving } from '../model/SaveSaving.model';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  imports: [ReactiveFormsModule,NgFor,NgIf,RouterLink],
  templateUrl: './new-account.html',
  styleUrl: './new-account.css',
})
export class NewAccount implements OnInit{
  newacountForm!:FormGroup;
  constructor(private fb:FormBuilder,private acountserver:Accountservice) {}
  
  ngOnInit(): void {
    this.newacountForm=new FormGroup({
      TypeAccount: this.fb.control("",[Validators.required]),
      balance: this.fb.control(0,[Validators.required,Validators.min(1)]),
      customerId: this.fb.control(0,[Validators.required,Validators.min(1)]),
      interestRate: this.fb.control(0),
      overDraft: this.fb.control(0),
      status: this.fb.control("",[Validators.required]),
    })
    this.newacountForm.get('TypeAccount')?.valueChanges.subscribe(value => {
      const destControl = this.newacountForm.get('overDraft');
      const destControl2 = this.newacountForm.get('interestRate');
      if (value === 'Current') {
        destControl?.setValidators([Validators.required,Validators.min(1)]);
        destControl2?.clearValidators();
      } else if(value === 'Saving'){
        destControl2?.setValidators([Validators.required,Validators.min(1)]);
        destControl?.clearValidators();
      }
      destControl?.updateValueAndValidity();
      destControl2?.updateValueAndValidity();
    });
  }

  ajouterAccount(){
    if(this.newacountForm.value.TypeAccount=="Current"){
      let current : SaveCurrent={initialBalance: this.newacountForm.value.balance,overDraft: this.newacountForm.value.overDraft,customerId: this.newacountForm.value.customerId,accountStatus: this.newacountForm.value.status}
      this.acountserver.SaveCurrent(current).subscribe({
        next: (data)=>{
          alert("account ajouter avec sucéss")
          this.newacountForm.reset();
        },
        error: (err)=>{
          alert("cette customer n'exist pas");
        }
      })
    }else if(this.newacountForm.value.TypeAccount=="Saving"){
      let saving : SaveSaving={initialBalance: this.newacountForm.value.balance,interestRate: this.newacountForm.value.interestRate,customerId: this.newacountForm.value.customerId,accountStatus: this.newacountForm.value.status}
      this.acountserver.SaveSaving(saving).subscribe({
        next: (data)=>{
          alert("account ajouter avec sucéss")
          this.newacountForm.reset();
        },
        error: (err)=>{
          alert("cette customer n'exist pas");
        }
      })
    }
  }
}
