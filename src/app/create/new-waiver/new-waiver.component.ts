import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formPieces = this.fb.group({
      pieces: this.fb.array([]),
    });

    this.waiverDetails = this.fb.group({
      type: ['internal', Validators.compose([Validators.required])],
      typeNo: ['1', Validators.compose([Validators.required])],
      lapse: ['quantity',Validators.compose([Validators.required])]
    })
    
    this.addPiece();

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
    console.log(this.waiverDetails);
    console.log(this.formPieces);
  }
}
