import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'repeated-waivers-warning',
  templateUrl: './repeated-waivers.component.html',
  styleUrls: ['./repeated-waivers.component.scss']
})
export class RepeatedWaiversComponent implements OnInit {

  @Input() public body = [];
  
  constructor(public modalService : NgbModal) { }

  ngOnInit(): void {
    
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {

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

    window.open(url,'_blank'); //Can't use router.navigate 
  }

}
