import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from './bug-list/bug-list.component';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [BugListComponent],
    exports: [
        BugListComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class BugListModule { }
