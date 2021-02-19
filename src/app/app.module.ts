import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { Error404Component } from './errors/error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    Error404Component,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
