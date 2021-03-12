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

  constructor(public location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
