import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customerservice } from '../services/customerservice';
import { Form, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { validate } from '@angular/forms/signals';
@Component({
  selector: 'app-newcustomer',
  imports: [ NgFor,NgIf,RouterLink,ReactiveFormsModule],
  templateUrl: './newcustomer.html',
  styleUrl: './newcustomer.css',
})
export class Newcustomer implements OnInit {

  saveformGroup!: FormGroup;

  constructor(private custserver:Customerservice,private fb:FormBuilder){}

  ngOnInit(): void{
    this.saveformGroup= this.fb.group({
      name: this.fb.control("",[Validators.required,Validators.minLength(4)]),
      email: this.fb.control("",[Validators.required,Validators.email])
    })
  }
  saveCustomer(){
    let name=this.saveformGroup?.value.name;
    let email=this.saveformGroup?.value.email;
    let customer: Partial<Customer> = { name: name, email: email };
    this.custserver.saveCustomer(customer).subscribe({
      next: (data)=>{
        alert("Customer saved successfully");
      },
      error: (err)=>{
        console.log(err);
      }
    })
    this.saveformGroup.reset();

  }

}
