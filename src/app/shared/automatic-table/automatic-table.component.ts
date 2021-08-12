import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './automatic-table.component.html',
  styleUrls: ['./automatic-table.component.scss']
})
export class AutomaticTableComponent implements OnInit {

  @Input() public data = [
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
    {a:10,b:100,c:200},
  ];

  @Input() public key = 'number';
  @Output() public onSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getKeys(){
    return Object.keys(this.data[0]);
  }

  goTo(index : number){
    console.log(index);
    this.onSelect.emit(this.data[index][this.key]);
  }

  isDate(value : string){
    return new Date(value).toString() != 'Invalid Date' && value.toString().slice(-1) == 'Z'; 
  }

}
