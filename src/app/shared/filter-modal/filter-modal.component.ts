import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  @Input() public title = 'Filter waivers';
  @Input() public message = 'Select the filters you want to apply';
  @Input() public trigger = 'Apply filters';

  @Output() public apply = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reset = new EventEmitter<void>();

  public filterForm;

  constructor(private modalService : NgbModal,
              private fb : FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      number : [''],
      customer : [''],
      originator : [''],
      area : [''],
      startDate : [''],
      endDate : [''],
      type : [''],
      typeNumber : [''],
      status: ['']
    });
  }

  get(control){
    return this.filterForm.controls[control].value;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(this.get('number'));
      console.log(this.filterForm);
      switch(result){
        case 'YES':
          this.apply.emit();
          break;
        case 'NO':
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

  getClass(control){
    let ctrl = this.filterForm.controls[control];
    if(!ctrl.touched ){
      return '';
    }
    return 'is-valid';
  }

}
