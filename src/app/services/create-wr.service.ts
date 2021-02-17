import { Injectable } from '@angular/core';
import { WR } from '../interfaces/create-wr';

@Injectable({
  providedIn: 'root'
})
export class CreateWrService {

  public wr : WR;

  constructor() { 
    this.setValues();
  }

  setValues(){
    
  }
}
