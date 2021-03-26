import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reset = new EventEmitter<void>();

  public filterForm : FormGroup;
  public filters : string[];

  constructor(private modalService : NgbModal,
              private fb : FormBuilder,
              public titleCase : TitleCasePipe) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      number : [''],
      customer : [''],
      originator : [''],
      area : [''],
      from : [''],
      to : [''],
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
      switch(result){
        case 'YES':
          let filter = this.getValue();
          this.apply.emit(filter);
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

  getClass(control){
    let ctrl = this.filterForm.controls[control];
    if(!ctrl.touched || ctrl.value == ''){
      return '';
    }
    return 'is-valid';
  }

  resetForm(){
    this.reset.emit();
    this.filterForm.reset();
  }

  getValue(){
    let filter = {};
    this.filters = [];
    Object.keys(this.filterForm.controls).forEach(key => {
      let control = this.filterForm.controls[key];
      if(control.value != null && control.value != ''){
        filter[key] = control.value;
        let fil = this.titleCase.transform(
          key.split(/(?=[A-Z])/).join(' ').toLocaleLowerCase()
          ) + ' : ' + this.titleCase.transform(filter[key]);
        this.filters.push(fil);
      }
    });
    return filter;
  }

}
