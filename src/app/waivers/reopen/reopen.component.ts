import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private alert : AlertService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.waiverId = params.get('id');
    })
  }

}
