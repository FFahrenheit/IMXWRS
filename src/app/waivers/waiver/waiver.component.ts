import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetWaiverService } from 'src/app/services/get-waiver.service';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.scss']
})
export class WaiverComponent implements OnInit {

  @Input() public id = '';
  @Output() public hasError = new EventEmitter<boolean>();

  public numbers = Array(3).fill(0).map((x,i)=>i);
  public wr;
  public exists = true;

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
          this.hasError.emit(this.exists);
        });
  }

  goBack(){
    this.location.back();
  }

}