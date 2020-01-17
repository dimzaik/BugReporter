import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {BugListModule} from './features/bug-list/bug-list.module';
import {BugModule} from './features/bug/bug.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
      BugListModule,
      BugModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
