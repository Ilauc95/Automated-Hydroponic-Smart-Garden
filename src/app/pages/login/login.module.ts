import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{
      path: '',
      component: LoginComponent
    }])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
