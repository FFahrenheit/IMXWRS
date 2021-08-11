import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { AlertService } from 'src/app/shared/alert';
import { decodedTextSpanIntersectsWith } from 'typescript';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.scss']
})
export class AttachComponent implements OnInit {

  public waiverId : string;
  public exists = false;
  public wr;
  public cannotApprove = true;

  public form : FormGroup;
  public files = [];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private alert : AlertService,
              private fb : FormBuilder,
              private upload : UploadFilesService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    });

    this.form = this.fb.group({
      description: ['', Validators.required]
    });
  }

  public updateExistance($event) : void{
    this.exists = $event;  
  }

  public getWaiver($event) : void{
    console.log('Got');
    this.wr = $event;
  }

  public getClass(ctrl : string){
    if(this.get(ctrl).untouched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getFiles($event){
    this.files = $event;
    console.log(this.files);
  }

  public next() : void{
    let description = this.get('description').value;
    this.upload.attachFiles(this.files, description, this.waiverId)
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Files attached');
            setTimeout(() => {
              this.router.navigate(['waivers','view', this.waiverId]);
            }, 2500);
          }else{
            this.alert.error("Couldn't upload reference files");
          }
        },error=>{
          this.alert.error("Couldn't upload reference files");
        });
  }

  public getReasons() : string[]{
    let reasons = [];

    if(this.form.invalid){
      reasons.push('Please type a description to these files');
    }

    if(this.files?.length <= 0){
      reasons.push('Please upload at least a file');
    }

    return reasons;
  }

  show(){
    this.form.markAllAsTouched();
  }

}
