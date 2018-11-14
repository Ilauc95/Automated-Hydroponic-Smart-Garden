import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCardModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent
    }])
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
