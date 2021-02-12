import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public submitted = false;

  constructor(private router : Router,
              private fb : FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log("Submitted!");
    console.log(this.form.value);
  }

}
