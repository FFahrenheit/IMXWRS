import { Component, OnInit } from '@angular/core';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public waiver : any;

  constructor(private editService : EditService) { }

  ngOnInit(): void {
    this.waiver = this.editService.getWaiver();
  }

  confirm(){
    console.log('xd');
  }
}
