import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private data;

  constructor(private http: HttpClient) { }

  public getStatData(action: string, user: string, type: string) {
    return this.http.get(
      `${base_url}/stats/data/${action}/${user}/${type}`
    ).pipe(
      map(resp => {
        console.log(resp);
        if (resp['ok']) {
          this.data = resp['data'];
          return true;
        }
        return false;
      }), catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }

  public getData() {
    return this.data;
  }
}
