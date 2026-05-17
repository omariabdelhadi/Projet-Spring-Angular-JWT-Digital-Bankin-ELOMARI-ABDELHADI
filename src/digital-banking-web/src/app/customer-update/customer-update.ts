import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { Customerservice } from '../services/customerservice';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-customer-update',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './customer-update.html',
  styleUrl: './customer-update.css',
})
export class CustomerUpdate implements OnInit {

  UpdateForm!:FormGroup;
  customer!:Customer;
  constructor(private routerA:ActivatedRoute,private fb:FormBuilder,private custserver:Customerservice) {}
  ngOnInit(): void {
    let id=this.routerA.snapshot.params['id'];
    this.UpdateForm=this.fb.group({
      name:this.fb.control(""),
      email:this.fb.control("")
    });
    this.custserver.getCustomer(id).subscribe({
      next: (data)=>{
        this.customer=data;
        this.UpdateForm.setValue({
          name:this.customer.name,
          email:this.customer.email
        })
      },error: (err)=>{
        console.log(err);
      }

    })
  }

  Update(){
    let name=this.UpdateForm?.value.name
    let email=this.UpdateForm?.value.email
    this.customer.name=name;
    this.customer.email=email;
    this.custserver.UpdateCustomer(this.customer.id,this.customer).subscribe({
      next: (data)=>{
        alert("Updated successfully")
      },error: (err)=>{
        console.log(err);
      }
    })
    this.UpdateForm.reset();
  }
  
}
