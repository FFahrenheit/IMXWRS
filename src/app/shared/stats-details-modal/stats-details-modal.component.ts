import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'view-stats',
  templateUrl: './stats-details-modal.component.html',
  styleUrls: ['./stats-details-modal.component.scss']
})
export class StatsDetailsModalComponent implements OnInit {

  @Input() public title = 'Confirmar acción';
  @Input() public content = '¿Deseas confirmar esta acción?';
  @Input() public trigger = 'Confirmar';
  @Input() public myClass = 'px-5 m-3';
  @Input() public isDisabled = false;

  @Output() public accept = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.triggered.emit();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if(!this.isDisabled){
        switch (result) {
          case 'YES':
            this.accept.emit();
            break;
          case 'NO':
            this.reject.emit();
            break;
          default:
            this.cancel.emit();
            break;
        }
      }
    }, (reason) => {
      this.cancel.emit();
    });
  }

  public hi(){
     console.log('Hi from modal B)');
  }

}
