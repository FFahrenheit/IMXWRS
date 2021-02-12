import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public form = Object.create(null);
  public submitted = false;

  constructor(private router : Router,
              private fb : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username : ["",Validators.compose([Validators.required])
    ]});
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
  }
}
