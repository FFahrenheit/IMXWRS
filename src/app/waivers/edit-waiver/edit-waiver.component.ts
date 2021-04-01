import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-waiver',
  templateUrl: './edit-waiver.component.html',
  styleUrls: ['./edit-waiver.component.scss']
})
export class EditWaiverComponent implements OnInit {

  public waiverId : string;
  public exists = false;

  constructor(private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.waiverId = params.get('id');
    })
  }

  updateExistance($event){
    this.exists = $event;  
  }

  goEdit(){
    this.router.navigate(['edit','details',this.waiverId]);
  }
}
