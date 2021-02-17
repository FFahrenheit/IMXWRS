import { Injectable } from '@angular/core';
import { WR, FirstStep, Piece , SecondStep, Deviation, Action } from '../interfaces/create-wr';

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

  setSecondStep(risk : SecondStep){
    this.wr.risk = risk;
    console.log(this.wr.risk);
  }

  setDeviations(deviations : Deviation[]){
    this.wr.deviations = deviations;
    console.log(this.wr.deviations);
  }

  setActions(actions : Action[]){
    this.wr.actions = actions;
    console.log(this.wr.actions);
  }

}
