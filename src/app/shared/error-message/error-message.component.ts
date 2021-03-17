import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() public title = 'Error';
  @Input() public description = "We couldn't find the requested resource";
  @Input() public type = 'error';

  constructor(public location : Location) { }
  
  public url; 
  public error_url = './../../../assets/img/error.png';
  public empty_url = './../../../assets/img/empty.png';

  ngOnInit(): void {
    switch(this.type){
      case 'error':
        this.url = this.error_url;
        break;
      case 'empty':
        this.url = this.empty_url;
        break;
    }
  }

  goBack(){
    this.location.back();
  }

}
