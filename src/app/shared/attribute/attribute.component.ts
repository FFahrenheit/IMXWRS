import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @Input() public name = 'Title';
  @Input() public value = 'Value';

  constructor() { }

  ngOnInit(): void {
  }

}
