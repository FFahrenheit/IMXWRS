import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  public waiverId;

  constructor(private route : ActivatedRoute,
              private router : Router ) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  confirm(){
    console.log(this.waiverId);
    setTimeout(()=>{
      this.router.navigate(['waivers','view',this.waiverId]);
    },1000);
  }
}
