import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public numbers = Array(3).fill(0).map((x,i)=>i);

  constructor(private router : Router,
              private waiverService : CreateWrService) { 
  }

  ngOnInit(): void {
    console.log(this.waiverService.wr);
  }

}
