import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CloseWaiverService {
  constructor(private http : HttpClient) { }

  closeWaiver(files, request : string){
    let headers = new HttpHeaders();
    headers.set('Conent-Type','multipart/form-data');
    let formData = new FormData;
    formData.append("request",request);
    formData.append("multi-files",files);
    return this.http.post(
      `${base_url}/waiver/${request}`,
      formData,{
        headers: headers
      }
    );
  }
}
