import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { Error404Component } from './error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    SpinnerComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
