import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.scss']
})
export class AttachComponent implements OnInit {

  public waiverId : string;
  public exists = false;
  public wr;
  public cannotApprove = true;
  public reason : string[];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private alert : AlertService) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    });
  }

  updateExistance($event){
    this.exists = $event;  
  }

  getWaiver($event){
    console.log('Got');
    this.wr = $event;
  }

}
