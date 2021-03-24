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
  @Output() public hasError = new EventEmitter<boolean>();

  public wr;
  public exists = true;

  constructor(public datePipe : DatePipe,
              public waiverService : GetWaiverService,
              public location : Location,
              public router : Router) { }

  ngOnInit(): void {
    this.waiverService.loadWaiver(this.id)
        .subscribe(resp=>{
          this.exists = resp;
          if(this.exists){
            this.wr = this.waiverService.getWaiver();

            if(this.wr != this.wr?.number){ //Changing url to keep things updated
              let route = this.router.url;
              route = route.replace(this.id,this.wr?.number);
              this.id = this.wr?.number;
              this.router.navigate(route.split('/'));
            }

          }
          this.hasError.emit(this.exists);
        });
  }

  goBack(){
    this.location.back();
  }

}