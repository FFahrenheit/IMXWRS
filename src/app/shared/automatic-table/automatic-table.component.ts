import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(Object.keys(this.data[0]));
  }

  getKeys(){
    return Object.keys(this.data[0]);
  }

  goTo(index : number){
    console.log(index);
  }

}
