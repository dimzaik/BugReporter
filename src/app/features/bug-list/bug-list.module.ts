import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from './bug-list/bug-list.component';



@NgModule({
    declarations: [BugListComponent],
    exports: [
        BugListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class BugListModule { }
