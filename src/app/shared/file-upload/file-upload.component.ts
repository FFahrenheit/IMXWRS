import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files = [];

  constructor() { }

  ngOnInit() {
    // let imagesPreview = (input) => {
    //   if (input.files) {
    //     let filesAmount = input.files.length;
    //     for (let i = 0; i < filesAmount; i++) {
    //       console.log(input.files[i]);
    //     }
    //   }
    // };

    // $("#input-multi-files").on("change", function() {
    //   imagesPreview(this);
    // });

  }

  addFile($event){
    console.log($event);
  }
}
