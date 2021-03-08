import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'responsable-input',
  templateUrl: './responsable-input.component.html',
  styleUrls: ['./responsable-input.component.scss']
})
export class ResponsableInputComponent implements OnInit {
  
  public form = this.fb.group({
    name:  ['',Validators.compose([Validators.required])]
  });
  
  public model : any;

  @Input() public users = [];

  constructor(public fb : FormBuilder) { }

  ngOnInit(): void {
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
      return;
    }

    this.users.forEach(u=>{
      if(u.name == uName){
        console.log('No error');
        this.name.setErrors(null);
        return;
      }
    });
  }
}
