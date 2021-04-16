import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloseWaiverService } from 'src/app/services/close-waiver.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  public waiverId : string;
  public files = [];

  constructor(private route : ActivatedRoute,
              private closeService : CloseWaiverService,
              private alert : AlertService,
              private router : Router) { }

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
    window.scroll(0,0);
    this.closeService.closeWaiver(this.files,this.waiverId)
        .subscribe(resp=>{
          if(resp['ok']){
            this.alert.success("Waiver closed");
            setTimeout(() => {
              this.router.navigate(['waivers','view',this.waiverId]);
            }, 3030);
          }else{
            let msg = resp['message'] || "Error";
            this.alert.warn(msg,{ autoClose: false});
          }
        },error=>{
          this.alert.error("Server error: " + error,{ autoClose: false});
        });
  }

}
