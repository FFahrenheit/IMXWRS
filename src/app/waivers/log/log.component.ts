import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  public tests = [
    {
      id: 1,
      name: 'Ivan'
    },
    {
      id: 2,
      name: 'Diana'
    },
    {
      id: 3,
      name: 'Katia'
    },
    {
      id: 4,
      name: 'Chop'
    },
    {
      id: 5,
      name: 'Mex'
    }
  ]

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

}
