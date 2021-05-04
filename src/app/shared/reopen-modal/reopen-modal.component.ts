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
  private currentModal;

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
    this.currentModal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    return ctrl.value == '' || ctrl.value == null ? 'is-invalid' : 'is-valid';
  }

  getContent(){
    return `Do you want to reopen this waiver 
    from ${ this.datePipe.transform(this.dateForm.controls['startDate'].value,'longDate') } 
    to ${ this.datePipe.transform(this.dateForm.controls['endDate'].value,'longDate') }?`;
  }

  getReasons(){
    let reasons = [];
    if(this.dateForm.controls['startDate'].value == ''){
      reasons.push('You must provide a start date');
    }
    if(this.dateForm.controls['endDate'].value == ''){
      reasons.push('You must provide an end date');
    }

    return reasons;
  }

  confirm(){
    this.apply.emit(this.dateForm.value);
    this.modalService.dismissAll();
  }

}
