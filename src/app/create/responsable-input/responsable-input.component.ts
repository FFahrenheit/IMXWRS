import { Component, Input, OnInit, Output, EventEmitter, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'responsable-input',
  templateUrl: './responsable-input.component.html',
  styleUrls: ['./responsable-input.component.scss']
})
export class ResponsableInputComponent implements OnInit,AfterContentInit {
  
  public form : FormGroup = Object.create(null);  ;

  public savedUser : any = {};
  public model : any;

  @Input() public users = [];
  @Input() public index;

  // @Input() public defaultUser = {};
  @Output() public update = new EventEmitter();

  constructor(public fb : FormBuilder,
              private cdRef: ChangeDetectorRef) { 
  }
  
  ngAfterContentInit(){
    this.cdRef.detectChanges(); 

    // if(this.defaultUser != null){
    //   console.log(this.defaultUser);
    //   this.savedUser = this.defaultUser;
    //   console.log(this.savedUser['responsable']);
    //   this.form.controls['name'].setValue(this.savedUser['responsable']);
    //   this.form.controls['name'].patchValue(this.savedUser['responsable']);
    //   this.form.controls['name'].updateValueAndValidity();
    // }else{
    //   console.log('Not defined');
    // }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:  [/*this.defaultUser['responsable']||*/ '' ,Validators.compose([Validators.required])]
    });
  }

  get name(): any {
    return this.form.controls['name'];
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  formatter = (x: {name: string}) => x.name;

  getStyle(){
    this.name.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if(!this.name.touched){
      return '';
    }
    this.isValid();
    return (this.name.valid && !this.name.hasError('incorrect')) ? 'is-valid' : 'is-invalid';
  }

  isValid(){
    let uName = this.name.value;

    this.name.setErrors({
      'incorrect': true
    });    

    if(typeof uName === 'object' && uName !== null    ){
      this.name.setErrors(null);
      this.savedUser = uName;
    }

    this.users.forEach(u=>{
      if(u.name == uName){
        this.name.setErrors(null);
        this.savedUser = u;
      }
    });

    let data = this.savedUser;
    data['index'] = this.index;

    this.update.emit(data);
  }

  markAsTouched(){
    this.form.markAllAsTouched();
  }
}
