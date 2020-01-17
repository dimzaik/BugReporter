import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from './bug-list/bug-list.component';
import {RouterModule} from '@angular/router';
import {MatSortModule, MatTableModule} from '@angular/material';



@NgModule({
    declarations: [BugListComponent],
    exports: [
        BugListComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
  ]
})
export class BugListModule { }
