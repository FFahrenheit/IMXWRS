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
    this.waiver.actions =  [...(srv.actions),...(srv.newActions|| []),...(srv.modifiedActions || [])];
    console.log(this.waiver.actions);
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
}
