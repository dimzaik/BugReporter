import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {BugListModule} from './features/bug-list/bug-list.module';
import {BugModule} from './features/bug/bug.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorIntl} from '@angular/material';
import {MatPaginatorIntlGr} from './models/mat-paginator.intl';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from './core/httpInterceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
      BugListModule,
      BugModule,
      BrowserAnimationsModule
    ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlGr},{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
