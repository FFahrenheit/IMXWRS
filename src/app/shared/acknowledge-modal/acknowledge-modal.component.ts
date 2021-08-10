import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'acknowledge',
  templateUrl: './acknowledge-modal.component.html',
  styleUrls: ['./acknowledge-modal.component.scss']
})
export class AcknowledgeModalComponent implements OnInit {

  @Input() public title = 'Acknowledge waiver';
  @Input() public content = 'Do you confirm your acknowledgment about this waiver?';
  @Input() public trigger = 'Acknowledge';
  @Input() public myClass = 'float-right px-5 mx-3 my-3';
  @Input() public isDisabled = false;
  @Input() public reason = "You can't acknowledge this waiver";

  @Output() public accept = new EventEmitter<string>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  private user : User;
  private roles : string[];
  private form : FormGroup;

  public modalReference;

  constructor(private modalService: NgbModal,
              private login       : AuthenticationService,
              private fb          : FormBuilder) { }

  ngOnInit(): void {
    if(this.reason.length==0){
      this.reason = "You can't acknowledge this waiver"; 
    }
    this.user = this.login.getUser();
    this.roles = [ this.user.position ].concat(this.user.roles);

    this.roles = Array.from(new Set(this.roles));

    if(this.roles.indexOf('employee') >= 0){
      this.roles.splice(this.roles.indexOf('employee'),1);
    }

    console.log({
      roles: this.roles
    });

    this.form = this.fb.group({
      position: ['', Validators.required]
    });

    if(this.roles.length == 1){
      this.get('position').setValue(this.roles[0]);
    }
  }

  open(content) {
    this.triggered.emit();
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
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

  public areReasons() : boolean{
    return Array.isArray(this.reason);
  }

  public getClass(ctrl : string) : string{
    if(this.get(ctrl).untouched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public confirm() : void{
    if(this.form.invalid){
      return this.form.markAllAsTouched();
    }
    this.accept.emit(this.get('position').value);
    this.modalReference.close();
  }
}
