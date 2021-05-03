import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'reopen-modal',
  templateUrl: './reopen-modal.component.html',
  styleUrls: ['./reopen-modal.component.scss']
})
export class ReopenModalComponent implements OnInit {

  @Input() public trigger = 'Reopen waiver';
  @Input() public message = 'Select the new dates'
  @Input() public title = 'Reopen recurring waiver';

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reset = new EventEmitter<void>();

  public touched;
  public today;
  public dateForm;

  constructor(private modalService : NgbModal,
              private datePipe : DatePipe,
              private fb : FormBuilder) { 
  }

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.dateForm = this.fb.group({
      startDate : ['',Validators.compose([Validators.required])],
      endDate: ['',Validators.compose([Validators.required])]
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      switch(result){
        case 'YES':
          let dates = this.dateForm.getValue();
          this.apply.emit(dates);
          this.touched = true;
          break;
        case 'NO':
          this.resetForm();
          this.reset.emit();
          break;
        default:
          this.cancel.emit();
          break;
      }
    }, (reason) => {
      this.cancel.emit();
    });
  }

  resetForm(){
    this.reset.emit();
    this.dateForm.reset();
  }

  getClass(control : string){
    let ctrl = this.dateForm.controls[control];
    if(!ctrl.touched){
      return '';
    }
    return ctrl.value == '' ? 'is-invalid' : 'is-valid';
  }

}
