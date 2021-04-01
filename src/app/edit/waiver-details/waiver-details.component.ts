import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiver-details',
  templateUrl: './waiver-details.component.html',
  styleUrls: ['./waiver-details.component.scss']
})
export class WaiverDetailsComponent implements OnInit {

  public number : string;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {

  }

}
