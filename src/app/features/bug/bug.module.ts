import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugComponent } from './bug/bug.component';
import {AppRoutingModule} from '../../app-routing.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';



@NgModule({
  declarations: [BugComponent],
  exports: [
    BugComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class BugModule { }
