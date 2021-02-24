import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-waivers',
  templateUrl: './my-waivers.component.html',
  styleUrls: ['./my-waivers.component.scss']
})
export class MyWaiversComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }

}
