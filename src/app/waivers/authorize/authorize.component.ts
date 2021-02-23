import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  public waiverId;

  constructor(private route : ActivatedRoute ) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  confirm(){
    console.log(this.waiverId);
  }
}
