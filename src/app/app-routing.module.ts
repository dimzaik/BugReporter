import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BugListComponent} from './features/bug-list/bug-list/bug-list.component';
import {BugComponent} from './features/bug/bug/bug.component';


const routes: Routes = [
  { path: '', component: BugListComponent },
  { path: 'addEdit', component: BugComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
