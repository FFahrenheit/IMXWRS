import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-waivers',
  templateUrl: './approved-waivers.component.html',
  styleUrls: ['./approved-waivers.component.scss']
})
export class ApprovedWaiversComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToWaiver(id){
    this.router.navigate(['waivers','view',id]);
  }


}
