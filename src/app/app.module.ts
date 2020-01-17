import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {BugListModule} from './features/bug-list/bug-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
      BugListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }