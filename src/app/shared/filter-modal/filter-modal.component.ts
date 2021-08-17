import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaiversService } from 'src/app/services/waivers.service';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  @Input() public title = 'Filter waivers';
  @Input() public message = 'Select the filters you want to apply';
  @Input() public trigger = 'Apply filters';
  @Input() public blocked = [];

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reset = new EventEmitter<void>();

  public filterForm : FormGroup;
  public filters : string[];
  public touched = false;

  constructor(private modalService : NgbModal,
              private fb : FormBuilder,
              public titleCase : TitleCasePipe,
              public waiverService : WaiversService) { }

  ngOnInit(): void {
    let saved;
    console.log(this.blocked.length);
    if(this.blocked.length == 0){
      saved = this.waiverService.savedObject;
    }
    this.filterForm = this.fb.group({
      number : [saved?.number || ''],
      customer : [saved?.customer || ''],
      originator : [saved?.originator || ''],
      area : [saved?.area || ''],
      from : [saved?.from ||''],
      to : [saved?.to || ''],
      type : [saved?.type || null],
      typeNumber : [saved?.typeNumber||null],
      status: [saved?.status || null]
    });
    this.getValue();
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

  getClass(control){
    let ctrl = this.filterForm.controls[control];
    if(  ctrl.value == null || !ctrl.touched || ctrl.value == ''){
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
