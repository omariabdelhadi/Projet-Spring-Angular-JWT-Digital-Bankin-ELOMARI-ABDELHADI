import { Routes } from '@angular/router';
import {Customers} from './customers/customers';
import {Accounts}  from './accounts/accounts';
import { Newcustomer } from './newcustomer/newcustomer';
import { CustomerAccounts } from './customer-accounts/customer-accounts';
import { CustomerUpdate } from './customer-update/customer-update';
import { NewAccount } from './new-account/new-account';
import { Component } from '@angular/core';
import { FormulaireLogin } from './formulaire-login/formulaire-login';
import { AdminTemplate } from './admin-template/admin-template';
import { authenticationGuard } from './guards/authentication-guard';
import { authorizationGuard } from './guards/authorization-guard';
import { NoteAuthorizie } from './note-authorizie/note-authorizie';

export const routes: Routes = [
  
  {path:"login",component:FormulaireLogin},
  {path:"", redirectTo:"/login",pathMatch:"full"},
  {path:"admin",component:AdminTemplate,children:[
    {path:"customers",component:Customers},
    {path:"accounts",component:Accounts},
    {path:"noteAuthz",component:NoteAuthorizie},
    {path:"accounts/:id",component:Accounts},
    {path:"newcustomer",component:Newcustomer,canActivate:[authorizationGuard], data:{ROLES:'ADMIN'}},
    {path:"customerAccounts/:id",component:CustomerAccounts},
    {path: "customerUpdate/:id", component:CustomerUpdate,canActivate:[authorizationGuard], data:{ROLES:'ADMIN'}},
    {path:"newacount",component:NewAccount,canActivate:[authorizationGuard], data:{ROLES:'ADMIN'}},
  ], canActivate:[authenticationGuard]}

]; 
