import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetWaiverService } from 'src/app/services/get-waiver.service';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.scss']
})
export class WaiverComponent implements OnInit {

  @Input() public id = '';

  public numbers = Array(3).fill(0).map((x,i)=>i);
  public wr;

  constructor(public datePipe : DatePipe,
              public waiverService : GetWaiverService,
              public router : Router) { }

  ngOnInit(): void {
    this.waiverService.loadWaiver(this.id)
        .subscribe(resp=>{
          if(resp){
            this.wr = this.waiverService.getWaiver();
          }else{
            this.router.navigate(['error404']);
          }
        })
  }

}