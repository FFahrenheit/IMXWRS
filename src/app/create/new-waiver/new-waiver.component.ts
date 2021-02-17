import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-waiver',
  templateUrl: './new-waiver.component.html',
  styleUrls: ['./new-waiver.component.scss']
})
export class NewWaiverComponent implements OnInit {
  
  
  formPieces : FormGroup = Object.create(null);
  waiverDetails : FormGroup = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe : DatePipe
  ) {
  }

  ngOnInit(): void {
    this.formPieces = this.fb.group({
      pieces: this.fb.array([]),
    });

    let defaultDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.waiverDetails = this.fb.group({
      area : ['', Validators.compose([Validators.required])],
      type: ['internal', Validators.compose([Validators.required])],
      customer : ['', Validators.compose([Validators.required])],
      typeNo: ['', Validators.compose([Validators.required])],
      extTitle : [''],
      extName : [''],
      extDate : [defaultDate],   
      extComments : [''],
      needsManager : [false],
      lapse: ['quantity',Validators.compose([Validators.required])],
      quantity : ['',Validators.compose([Validators.required])],
      specification: ['',Validators.compose([Validators.required])],
      startDate : [defaultDate],
      endDate : [defaultDate]
    })

    this.waiverDetails.get('type').valueChanges.subscribe(t =>{
      this.updateExtAuth(t);
    });

    this.waiverDetails.get('lapse').valueChanges.subscribe(t=>{
      this.updateLapse(t);
    })
    
    this.addPiece();
    this.updateLapse('quantity');
    this.updateExtAuth('internal');

  }

  updateExtAuth(t){
    if(t == 'external'){
      this.waiverDetails.controls['extTitle'].setValidators([Validators.required]);
      this.waiverDetails.controls['extName'].setValidators([Validators.required]);
      this.waiverDetails.controls['extDate'].setValidators([Validators.required]);

    }
    else{
      this.waiverDetails.controls['extTitle'].clearValidators();
      this.waiverDetails.controls['extName'].clearValidators();
      this.waiverDetails.controls['extDate'].clearValidators();
    }
    this.waiverDetails.updateValueAndValidity();
  }

  updateLapse(t){
    if(t == 'quantity'){
      this.waiverDetails.controls['quantity'].setValidators([Validators.required]);
      this.waiverDetails.controls['specification'].setValidators([Validators.required]);
      this.waiverDetails.controls['startDate'].clearValidators();
      this.waiverDetails.controls['endDate'].clearValidators();
    }else{
      this.waiverDetails.controls['startDate'].setValidators([Validators.required]);
      this.waiverDetails.controls['endDate'].setValidators([Validators.required]);
      this.waiverDetails.controls['quantity'].clearValidators();
      this.waiverDetails.controls['specification'].clearValidators();
    }
    this.waiverDetails.updateValueAndValidity();
  }

  get pieces(): FormArray {
    return this.formPieces.get('pieces') as FormArray;
  }

  addPiece(): void {
    const piece = this.fb.group({
      customer: [ '' ],
      internal: [ '' ]
    });

    this.pieces.push(piece);
  }

  deletePiece(index): void {
    this.pieces.removeAt(index);
  }

  next(){
    console.log(this.waiverDetails.value);
    console.log(this.formPieces.value);

    if(this.waiverDetails.valid){
      console.log("Valid");
    }else{
      console.log("Invalid");
      Object.keys(this.waiverDetails.controls).forEach(field => { // {1}
        const control = this.waiverDetails.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  getClass(control){
    if(!this.waiverDetails.controls[control].touched){
      return '';
    }else{
      if(this.waiverDetails.controls[control].hasError('required')){
        return 'is-invalid';
      }else{
        return 'is-valid';
      }
    }
  }
}
