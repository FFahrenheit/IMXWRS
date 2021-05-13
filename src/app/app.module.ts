import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { Error404Component } from './errors/error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Error403Component } from './errors/error403/error403.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    SpinnerComponent,
    Error404Component,
    DashboardComponent,
    Error403Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    TitleCasePipe,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
