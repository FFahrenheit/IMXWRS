import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetWaiverService } from 'src/app/services/get-waiver.service';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.scss']
})
export class WaiverComponent implements OnInit {

  @Input() public id = '';
  @Input() public title = '';
  @Input() public waiver = null;
  @Output() public hasError = new EventEmitter<boolean>();
  @Output() public receive = new EventEmitter<any>();

  public wr;
  public exists = true;

  constructor(public datePipe : DatePipe,
              public waiverService : GetWaiverService,
              public location : Location,
              public router : Router) { }

  ngOnInit(): void {
    if(this.waiver == null){
      this.waiverService.loadWaiver(this.id)
      .subscribe(resp=>{
        this.exists = resp;
        if(this.exists){
          this.wr = this.waiverService.getWaiver();
          this.receive.emit(this.wr);
          if(this.wr != this.wr?.number){ //Changing url to keep things updated
            let route = this.router.url;
            route = route.replace(this.id,this.wr?.number);
            this.id = this.wr?.number;
            this.router.navigate(route.split('/'));
          }
        }
        this.hasError.emit(this.exists);
      });
    }else{
      this.wr = this.waiver;
      this.id = this.wr.number;
    }

  }

  goBack(){
    this.location.back();
  }

}