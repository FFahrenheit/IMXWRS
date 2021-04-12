import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'repeated-waivers-warning',
  templateUrl: './repeated-waivers.component.html',
  styleUrls: ['./repeated-waivers.component.scss']
})
export class RepeatedWaiversComponent implements OnInit {

  public repeated = [1,2,3,4,5,6,7,8,9,10];

  constructor(public modalService : NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        switch (result) {
          case 'YES':
            break;
          case 'NO':
            break;
          default:
            break;
      }
    }, (reason) => {

    });
  }

  goToWaiver(id : string){
    const { protocol, host } = window.location;

    const path = 'waivers/view/' + id;

    const url = `${protocol}//${host}/${path}`;

    window.open(url,'_blank');
  }

}
