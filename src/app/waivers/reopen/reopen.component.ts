import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReopenService } from 'src/app/services/reopen.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-reopen',
  templateUrl: './reopen.component.html',
  styleUrls: ['./reopen.component.scss']
})
export class ReopenComponent implements OnInit {

  public waiverId : string;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private alert : AlertService,
              private reopenService : ReopenService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.waiverId = params.get('id');
    })
  }

  reopen($event){
    let body = $event;

    window.scroll(0,0);

    this.alert.info('Reopening waiver...');

    setTimeout(() => {
      this.reopenService.reopenWaiver(this.waiverId,body)
          .subscribe(
            resp=>{
              if(resp){
                this.alert.success("Waiver reopened");
                setTimeout(() => {
                  this.router.navigate(['waivers','view',this.waiverId]);
                }, 3010);
              }else{
                this.alert.error("Cannot reopen waiver");
              }
            },error=>{
              this.alert.error("Server error", { autoClose : false });
            }
          );
    }, 1800);
  }

}
