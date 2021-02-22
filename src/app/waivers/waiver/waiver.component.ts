import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.scss']
})
export class WaiverComponent implements OnInit {

  @Input() public id = '';

  public numbers = Array(3).fill(0).map((x,i)=>i);
  public wr;

  constructor(public datePipe : DatePipe) { }

  ngOnInit(): void {
  }

}