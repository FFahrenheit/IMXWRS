import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  private retryCount : number;

  constructor(private router : Router) {
    this.retryCount = 0;
   }

  intercept(req,next){
    const token = localStorage.getItem('token') || "";
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(tokenizedRequest).pipe(
      catchError((error) => {
        if(error.status == 0){
          this.retryCount += 1;
          console.log('Error: ' + this.retryCount + ' retries');
          if(this.retryCount >= 4){
            this.router.navigate(['500'])
          }
        }
        console.warn(error);
        return throwError('Error');
      }));
  }
}
