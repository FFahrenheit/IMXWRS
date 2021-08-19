import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public waiver : any;

  constructor(private editService : EditService,
              public alert : AlertService,
              private router : Router) { }

  ngOnInit(): void {
    this.waiver = this.editService.getWaiver();
    let srv = this.editService.wr;
    let actions;
    if(typeof srv.equalActions == 'undefined'){
      actions = [...(srv.actions)];
    }else{
      actions = [...(srv.equalActions),...(srv.newActions|| []),...(srv.modifiedActions || [])];
    }
    let act = Object.assign(actions);
    this.waiver.actions = act;
    console.log(this.waiver.authorizations);
    let saved = this.waiver;
    
    this.waiver = null;
    this.waiver = Object.assign(saved);
    console.log({
      wr: this.waiver
    });
  }

  confirm(){
    this.editService.update().subscribe(resp=>{
      if(resp){
        setTimeout(() => {
          this.alert.success("Updated")
        }, 1010 );
        setTimeout(() => {
          this.router.navigate(['waivers','view',this.waiver.number]);
        }, 3030);
      }else{
        this.alert.error("Couldn't update waiver",{autoClose : false});
      }
    },error=>{
      this.alert.error("Server error",{autoClose : false});
      console.log(error);
    })
  }

  public testService(){
    console.log('Testing upload');
    // console.log(this.editService.wr);
    this.editService.uploadFiles();
  }
}
