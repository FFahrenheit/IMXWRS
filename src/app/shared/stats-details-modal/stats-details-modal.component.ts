import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'view-stats',
  templateUrl: './stats-details-modal.component.html',
  styleUrls: ['./stats-details-modal.component.scss']
})
export class StatsDetailsModalComponent implements OnInit {

  @Input() public title = 'Stats details';
  @Input() public content = 'Stats detailf for current user';
  @Input() public isDisabled = false;
  @Input() public data = null;
  @Input() public error = null;
  @Input() public key = '';

  @Output() public close = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  @ViewChild("confirmModal") modalContent: TemplateRef<any>;

  public modalReference : any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public openDetails(){
    this.triggered.emit();
    this.modalReference = this.modalService.open(this.modalContent,{ ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.modalReference.result.then(result=>{
      this.close.emit();
    },close=>{
      this.close.emit();
    });
  }

  public clearModal(){
    this.data = null;
    this.error = null;
  }

  public seeWaiver(id){
    console.log(id);
  }

}
