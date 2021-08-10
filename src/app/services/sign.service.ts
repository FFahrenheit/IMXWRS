import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../interfaces/file.upload.interface';
import { UploadFilesService } from './upload-files.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient,
              private upload : UploadFilesService) { }

  public closeAction(actionId: string) {
    return this.http.put(`${base_url}/action/${actionId}`, {
      status: 'closed'
    })
      .pipe(map((resp: any) => {
        console.log(resp);
        if (resp.ok) {
          return true;
        }
        return false;
      }), catchError((error) => {
        console.log(error);
        return of(false);
      }));
  }

  public uploadFiles(files : File[], action : string, waiver : string){

    let calls = [];

    files.forEach(f=>{
      const file : FileUpload ={
        description: `Action #${action} closure evidence`,
        file: f,
        request: waiver
      };
      calls.push(this.upload.uploadFile(file, waiver));
    });

    return forkJoin(calls).pipe(
      map(resps=>{
        let count = 0;
        resps.forEach(r =>{
          count += r['ok'];
        });
        return count == resps.length;
      }), catchError(error=>{
        console.log(error);
        return of(false);
      })
    )
  }

  public signActivity(waiverId: string) {
    let body = {
      waiver: waiverId
    };

    return this.http.put(`${base_url}/activities/unsigned`, body)
      .pipe(map((resp: any) => {
        console.log(resp);
        if (resp.ok) {
          return true;
        }
        return false;
      }), catchError((error) => {
        console.log(error);
        return of(false);
      }));
  }
}
