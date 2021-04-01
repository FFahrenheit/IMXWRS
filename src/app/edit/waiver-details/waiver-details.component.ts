import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExternalAuth, Piece } from 'src/app/interfaces/create-wr.interface';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-waiver-details',
  templateUrl: './waiver-details.component.html',
  styleUrls: ['./waiver-details.component.scss']
})
export class WaiverDetailsComponent implements OnInit {

  public number : string;
  public formPieces : FormGroup = Object.create(null);
  public waiverDetails : FormGroup = Object.create(null);

  constructor(public editService : EditService,
              private fb : FormBuilder,
              public datePipe : DatePipe,
              private router : Router) { }

  ngOnInit(): void {
    this.formPieces = this.fb.group({
      pieces: this.fb.array([]),
    });

    let wr = this.editService.getWaiver();
    this.number = this.editService.number;

    let defaultDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");

    this.waiverDetails = this.fb.group({
      area : [wr?.area || '', Validators.compose([Validators.required])],
      type: [wr?.type || 'internal', Validators.compose([Validators.required])],
      customer : [wr?.customer || '', Validators.compose([Validators.required])],
      typeNumber: [wr?.typeNumber || '', Validators.compose([Validators.required])],
      extTitle : [wr?.externalAuthorization?.title || ''],
      extName : [wr?.externalAuthorization?.name || ''],
      extDate : [wr?.externalAuthorization?.date || defaultDate],   
      extComments : [wr?.externalAuthorization?.comments || ''],
      needsManager : [false],
      lapse: [(wr?.expiration?.endDate == null) ? 'quantity' :  'time'|| 'quantity',Validators.compose([Validators.required])],
      quantity : [wr?.expiration?.quantity || ''],
      specification: [wr?.expiration?.specification || ''],
      startDate : [wr?.expiration?.startDate || defaultDate],
      endDate : [wr?.expiration?.endDate || '']
    });

    this.waiverDetails.get('type').valueChanges.subscribe(t =>{
      this.updateExtAuth(t);
    });

    this.waiverDetails.get('lapse').valueChanges.subscribe(t=>{
      this.updateLapse(t);
    })

    if(this.editService.wr.parts == null || this.editService.wr.parts.length == 0 ){
      this.addPiece();
    }else{
      this.editService.wr.parts.forEach(p=>{
        const piece = this.fb.group({
          customer: [ p.customerPN || '' , Validators.compose([Validators.required])],
          internal: [ p.interplexPN || '' , Validators.compose([Validators.required])]
        });
    
        this.pieces.push(piece);
      });
    }

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
    }  
  }

  ngOnDestroy(){
    this.editService.changeDetails(this.waiverDetails.value);
    this.editService.changePieces(this.getPieces());

    console.log(this.editService.wr);
    this.router.navigate(['edit',this.number,'details']);
    console.log('xd');
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
