import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-activity',
  templateUrl: './sign-activity.component.html',
  styleUrls: ['./sign-activity.component.scss']
})
export class SignActivityComponent implements OnInit {

  public waiverId;
  public exists = false;

  constructor(private route : ActivatedRoute,
              private router : Router) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  confirm(){
    this.router.navigate(['waivers','view',this.waiverId]);
  }

  updateExistance($event){
    console.log('event : ' + $event);
    this.exists = $event;
  }
}
