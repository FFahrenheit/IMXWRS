import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() public type = 'file';
  @Output() public receive = new EventEmitter<any>();
  
  files : File[] = [];

  constructor() { }

  ngOnInit() {
  }

  addFile($event){
    // this.files = [...(this.files||[]), ...($event.target.files||[])];
    let fileList = $event.target.files;
    for(let i=0; i<fileList.length; i++){
      console.log(fileList.item(i));
      this.files.push(fileList.item(i));
    }
    this.receive.emit(this.files);
  }

  clearFile(index : number){
    this.files.splice(index,1);
    this.receive.emit(this.files);
  }
}
