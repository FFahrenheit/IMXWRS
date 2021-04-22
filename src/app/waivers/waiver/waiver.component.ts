import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilenamePipe } from 'src/app/pipes/filename.pipe';
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
  @Input() public hasGuard = false;

  @Output() public hasError = new EventEmitter<boolean>();
  @Output() public receive = new EventEmitter<any>();

  public wr;
  public exists = true;

  constructor(public datePipe : DatePipe,
              public waiverService : GetWaiverService,
              public location : Location,
              public router : Router,
              public filePipe : FilenamePipe) { }

  ngOnInit(): void {
    if(this.hasGuard){
      console.log(['Has guard' , this.waiverService.getWaiver()]);
      this.wr = this.waiverService.getWaiver();
      if(this.wr == null){
        this.exists = false;
      }
      this.id = this.wr.number;
    }else if(this.waiver == null){

      this.waiverService.loadWaiver(this.id)
      .subscribe(resp=>{
        this.exists = resp;
        this.hasError.emit(this.exists);
        console.log(['Loading waiver...', this.waiverService.getWaiver()]);
        if(this.exists){
          this.wr = this.waiverService.getWaiver();
          if(this.wr != this.wr?.number){ //Changing url to keep things updated
            
            let route = this.router.url;
            route = route.replace(this.id,this.wr?.number);
            this.id = this.wr?.number;
            this.router.navigate(route.split('/'));
                      this.receive.emit(this.wr);
          }
        }
         
      });
    }else if(this.waiver != null){
      console.log(['Waiver already loaded',this.waiver]);
      this.wr = this.waiver;
      this.id = this.wr.number;
    }else{
      console.log('To do...');
    }

    this.hasError.emit(this.exists);
    if(this.exists){
      this.receive.emit(this.wr);
    }

  }

  goBack(){
    this.location.back();
  }

  downloadFile(filename : string){
    return this.waiverService.downloadFile(filename);
  }

}