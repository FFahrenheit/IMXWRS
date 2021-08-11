import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';
import { Charting } from 'src/app/util/charting';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.scss']
})
export class OverallComponent implements OnInit {

  public charts;
  public user;

  constructor(private alert : AlertService,
              private userService : UsersService) { }

  ngOnInit(): void {

    this.userService.getUser('all').subscribe(
      resp=>{
        if(resp == null){
          this.alert.error("The information of this user couldn't be retrieved");
        }
        console.log(resp);
        if(resp){
          this.user = this.userService.getCurrentUser();
          let stats = this.userService.getStats();
          console.log(stats);

          let data = new Charting();
          
          this.charts = data.getCharts(stats, this.user.username);
          console.log(this.charts);
        }
      },
      error=>{
        this.alert.error("The information of this user couldn't be retrieved");
      }
    )
  }

}
