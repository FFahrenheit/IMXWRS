import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../interfaces/file.upload.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http : HttpClient) { }

  public attachFiles(files : File[], description: string, request : string){
    let calls = [];
    
    files.forEach(f => {
      const file : FileUpload ={
        description: description,
        file: f,
        request: request
      }

      calls.push(this.uploadFile(file, request));
    });

    return forkJoin(calls).pipe(
      map(resps=>{
        let count = 0;
        resps.forEach(r =>{
          count += r['ok'];
        });
        return count == resps.length;
      }),catchError(error=>{
        console.log(error);
        return of(false);
      })
    )
  }

  uploadFile(file : FileUpload, request : string){

    let headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    let formData = new FormData;
    formData.append('multi-files',file.file);
    formData.append('description',file.description);    

    return this.http.post(
      `${base_url}/upload/${request}`,
      formData,
      {
        headers: headers
      }
    );
  }

  uploadFiles(files : File[], request : string){
    let headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    let formData = new FormData;
    files.forEach(file=>{
      formData.append("multi-files",file);
    });
    formData.append('description','Evidences for closed waiver');
    return this.http.post(
      `${base_url}/upload/${request}`,
      formData,{
        headers: headers
      }
    );
  }
}
