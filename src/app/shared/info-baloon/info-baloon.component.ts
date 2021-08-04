import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info-baloon',
  templateUrl: './info-baloon.component.html',
  styleUrls: ['./info-baloon.component.scss']
})
export class InfoBaloonComponent implements OnInit {

  @Input() public hideOnTop = false;

  constructor() { }

  ngOnInit(): void {
  }

}
