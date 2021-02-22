import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-waiver',
  templateUrl: './view-waiver.component.html',
  styleUrls: ['./view-waiver.component.scss']
})

export class ViewWaiverComponent implements OnInit {

  public waiverId;

  constructor(private route : ActivatedRoute ) { 
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

}