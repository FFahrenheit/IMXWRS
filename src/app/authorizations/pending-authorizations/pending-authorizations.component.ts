import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-authorizations',
  templateUrl: './pending-authorizations.component.html',
  styleUrls: ['./pending-authorizations.component.scss']
})
export class PendingAuthorizationsComponent implements OnInit {

  public numbers = Array(5).fill(0).map((x,i)=>i);

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToWaiver(id){
    this.router.navigate(['waivers','authorize',id])
  }

}
