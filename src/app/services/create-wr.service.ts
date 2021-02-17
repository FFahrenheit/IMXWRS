import { Injectable } from '@angular/core';
import { WR, FirstStep, Piece } from '../interfaces/create-wr';

@Injectable({
  providedIn: 'root'
})
export class CreateWrService {

  public wr : WR = {};

  constructor() { 
  }

  setFirstStep(fs : FirstStep){
    this.wr.details = fs;
    console.log(this.wr.details);
  }

  setPieces(pieces : Piece[]){
    this.wr.pieces = pieces;
    console.log(this.wr.pieces);
  }

}
