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

  @Output() public select = new EventEmitter<string>();

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.select.emit(result);
    }, (reason) => {
      this.select.emit(reason);
    });
  }

}