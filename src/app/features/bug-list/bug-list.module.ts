import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from './bug-list/bug-list.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



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
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class BugListModule { }
