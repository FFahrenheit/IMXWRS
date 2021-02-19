import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExternalAuth, FirstStep, Piece } from 'src/app/interfaces/create-wr';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-new-waiver',
  templateUrl: './new-waiver.component.html',
  styleUrls: ['./new-waiver.component.scss']
})
export class NewWaiverComponent implements OnInit, OnDestroy {
  
  
  formPieces : FormGroup = Object.create(null);
  waiverDetails : FormGroup = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe : DatePipe,
    private waiverService : CreateWrService
  ) {
  }

  ngOnInit(): void {
    this.formPieces = this.fb.group({
      pieces: this.fb.array([]),
    });

    let defaultDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.waiverDetails = this.fb.group({
      area : [this.waiverService.wr.details?.area || '', Validators.compose([Validators.required])],
      type: [this.waiverService.wr.details?.type || 'internal', Validators.compose([Validators.required])],
      customer : [this.waiverService.wr.details?.customer || '', Validators.compose([Validators.required])],
      typeNo: [this.waiverService.wr.details?.typeNo || '', Validators.compose([Validators.required])],
      extTitle : [this.waiverService.wr.details?.externalAuthorization?.title || ''],
      extName : [this.waiverService.wr.details?.externalAuthorization?.name || ''],
      extDate : [this.waiverService.wr.details?.externalAuthorization?.date || defaultDate],   
      extComments : [this.waiverService.wr.details?.externalAuthorization?.comments || ''],
      needsManager : [this.waiverService.wr.details?.needsManager || false],
      lapse: [this.waiverService.wr.details?.appliesTo || 'quantity',Validators.compose([Validators.required])],
      quantity : [this.waiverService.wr.details?.quantity || ''],
      specification: [this.waiverService.wr.details?.specification || ''],
      startDate : [this.waiverService.wr.details?.startDate || defaultDate],
      endDate : [this.waiverService.wr.details?.endDate || '']
    })

    this.waiverDetails.get('type').valueChanges.subscribe(t =>{
      this.updateExtAuth(t);
    });

    this.waiverDetails.get('lapse').valueChanges.subscribe(t=>{
      this.updateLapse(t);
    })

    if(this.waiverService.wr.pieces == null || this.waiverService.wr.pieces.length == 0 ){
      this.addPiece();
    }else{
      this.waiverService.wr.pieces.forEach(p=>{
        const piece = this.fb.group({
          customer: [ p.customer || '' , Validators.compose([Validators.required])],
          internal: [ p.internal || '' , Validators.compose([Validators.required])]
        });
    
        this.pieces.push(piece);
      });
    }
    
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
    this.waiverDetails.controls['extTitle'].updateValueAndValidity();
    this.waiverDetails.controls['extName'].updateValueAndValidity();
    this.waiverDetails.controls['extDate'].updateValueAndValidity();  
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
    this.waiverDetails.controls['startDate'].updateValueAndValidity();
    this.waiverDetails.controls['endDate'].updateValueAndValidity();
    this.waiverDetails.controls['quantity'].updateValueAndValidity();
    this.waiverDetails.controls['specification'].updateValueAndValidity();
  }

  get pieces(): FormArray {
    return this.formPieces.get('pieces') as FormArray;
  }

  addPiece(): void {
    const piece = this.fb.group({
      customer: [ '' , Validators.compose([Validators.required])],
      internal: [ '' , Validators.compose([Validators.required])]
    });

    this.pieces.push(piece);
  }

  deletePiece(index): void {
    this.pieces.removeAt(index);
  }

  next(){
    if(this.waiverDetails.valid && this.formPieces.valid){
      this.ngOnDestroy();
    }else{
      this.waiverDetails.markAllAsTouched();
      this.formPieces.markAllAsTouched();
    }  }

  ngOnDestroy(){
    this.waiverService.setFirstStep(this.getForm());
    this.waiverService.setPieces(this.getPieces());
    this.router.navigate(['create', 'details'])
  }

  getForm(){
    let extAuth : ExternalAuth = {
      title : this.get('extTitle'),
      name : this.get('extName'),
      date : this.get('extDate'),
      comments : this.get('extComments') || ""
    };

    const form : FirstStep = {
      area : this.get('area'),
      type : this.get('type'),
      customer : this.get('customer'),
      externalAuthorization : (this.get('type') == 'external') ? extAuth : null,
      typeNo : this.get('typeNo'),
      needsManager : (this.get('typeNo')=='3') ? this.get('needsManager') : false,
      appliesTo  : this.get('lapse'),
      quantity : (this.get('lapse')=='quantity') ? this.get('quantity') : null,
      specification : (this.get('lapse')=='quantity') ? this.get('specification') : null,
      startDate : (this.get('lapse')!='quantity') ? this.get('startDate') : null ,
      endDate : (this.get('lapse')!='quantity') ? this.get('endDate') : null
    };

    return form;
  }

  get(control){
    return this.waiverDetails.controls[control].value;
  }

  getClass(control){
    if(!this.waiverDetails.controls[control].touched){
      return '';
    }
    return this.waiverDetails.controls[control].hasError('required') ? 'is-invalid' : 'is-valid';
  }

  checkPiece(piece : FormGroup,field : string){
    if(!piece.controls[field].touched){
      return '';
    }
    return piece.controls[field].hasError('required') ? 'is-invalid' : 'is-valid';
  }

  getPieces(){
    let pieces = [];
    this.pieces.value.forEach(p=>{
      const piece : Piece = {
        customer : p['customer'],
        internal : p['internal']
      };
      pieces.push(piece);
    })
    return pieces;
  }

}
