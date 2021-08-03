import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http : HttpClient) { }

  closeWaiver(files : File[], request : string){
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
