import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoverPasswordService } from 'src/app/services/recover-password.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public form = Object.create(null);
  public submitted = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private alert: AlertService,
    private recoverService: RecoverPasswordService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", Validators.compose([Validators.required])
      ]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.alert.info("Sending email...");
      this.recoverService.sendEmail(this.form.value)
        .subscribe(resp => {
          if (resp) {
            this.alert.success("Password recovered, please check your email");
            setTimeout(() => {
              this.router.navigate(['authentication', 'login']);
            }, 3500);
          } else {
            this.alert.error("Couldn't send email, check your username");
          }
        }, error => {
          this.alert.error("Server error", { autoClose: false });
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  getClass(control){
    if(!this.form.controls[control].touched){
      return '';
    }
    return this.form.controls[control].hasError('required') ? 'is-invalid' : 'is-valid';
  }
}
