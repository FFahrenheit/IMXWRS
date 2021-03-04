import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Origin, WR } from 'src/app/interfaces/create-wr.interface';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public wr : WR;

  public placeholder = 'PLACEHOLDER';
  public numbers = Array(3).fill(0).map((x,i)=>i);

  constructor(private router : Router,
              private waiverService : CreateWrService,
              public datePipe : DatePipe) { 
  }

  ngOnInit(): void {
    let origin : Origin = {
      originator: 'myself',
      date :new Date(),
      number : 'TBD'
    };

    this.waiverService.setOrigin(origin);

    this.wr = this.waiverService.wr;
    console.log(this.waiverService.wr);
  }

  confirm(){
    console.log("Ok!");
  }

}