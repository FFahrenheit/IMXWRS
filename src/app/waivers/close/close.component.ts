import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloseWaiverService } from 'src/app/services/close-waiver.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  public waiverId : string;
  public files = [];

  constructor(private route : ActivatedRoute,
              private closeService : CloseWaiverService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    });
  }

  getFiles($event){
    this.files = $event;
    console.log(this.files);
  }

  confirm(){
    this.closeService.closeWaiver(this.files,this.waiverId)
        .subscribe(resp=>{
          console.log(resp);
        },error=>{
          console.log(error);
        });
  }

}
