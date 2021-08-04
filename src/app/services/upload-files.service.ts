import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUpload } from '../interfaces/file.upload.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http : HttpClient) { }

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
