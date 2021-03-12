import { DatePipe, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  public exists;

  constructor(public datePipe : DatePipe,
              public waiverService : GetWaiverService,
              public location : Location) { }

  ngOnInit(): void {
    this.waiverService.loadWaiver(this.id)
        .subscribe(resp=>{
          this.exists = resp;
          if(this.exists){
            this.wr = this.waiverService.getWaiver();
          }
        });
  }

  goBack(){
    this.location.back();
  }

}