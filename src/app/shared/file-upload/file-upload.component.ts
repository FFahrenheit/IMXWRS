import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() public type = 'file';
  
  files = [];

  constructor() { }

  ngOnInit() {
  }

  addFile($event){
    this.files = [...(this.files||[]), ...($event.target.files||[])];
    console.log([$event, this.files]);
  }

  clearFile(index : number){
    this.files.splice(index,1);
    console.log([index, this.files]);
  }
}
