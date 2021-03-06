import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req,next){
    const token = localStorage.getItem('token') || "";
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(tokenizedRequest).pipe(
      catchError((error) => {
        console.log('Error');
        console.warn(error);
        return throwError('Error');
      }));
  }
}
