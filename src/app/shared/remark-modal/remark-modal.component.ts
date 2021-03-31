import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'remark',
  templateUrl: './remark-modal.component.html',
  styleUrls: ['./remark-modal.component.scss']
})
export class RemarkModalComponent implements OnInit {

  @Input() public title = 'Add comment to waiver request';
  @Input() public content = 'Please describe the issue. This waiver will change its status to pending editing';
  @Input() public trigger = 'Remark';
  @Input() public myClass = 'float-right px-5 mx-3 my-3';
  @Input() public disabled = false;

  @Output() public send = new EventEmitter<string>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();

  public form : FormGroup;
  public modalReference : any;

  constructor(private modalService : NgbModal,
              private fb : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: ['',Validators.compose([Validators.required])]
    });
  }

  open(content) {
    if(!this.disabled){
      this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.modalReference.result.then((result) => {
        switch(result){
          case 'YES':
            this.send.emit('');
            break;
          case 'NO':
            this.reject.emit();
            break;
          default:
            this.cancel.emit();
            break;
        }
      }, (reason) => {
        this.cancel.emit();
      });
    }    
  }

  submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }else{
      this.modalReference.close();
      let comment : string = this.form.controls['comment'].value;
      this.send.emit(comment);
      this.form.reset();
    }
  }

  getClass(controlName){
    let control = this.form.controls[controlName];
    if(!control.touched){
      return '';
    }
    return control.hasError('required') ? 'is-invalid' : 'is-valid'; 
  }
}
