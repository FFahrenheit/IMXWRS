import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-modal', 
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() public title = 'Confirm action';
  @Input() public content = 'Do you want to confirm this action?';
  @Input() public trigger = 'Confirm';
  @Input() public myClass = 'float-right px-5 mx-3 my-3';
  @Input() public isDisabled = false;
  @Input() public reason = 'It is currently disabled';

  @Output() public accept = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.reason.length==0){
      this.reason = 'It is currently disabled'; 
    }
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

  areReasons(){
    return Array.isArray(this.reason);
  }
}