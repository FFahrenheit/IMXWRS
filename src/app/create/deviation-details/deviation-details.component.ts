import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deviation } from 'src/app/interfaces/create-wr.interface';
import { CreateWrService } from 'src/app/services/create-wr.service';

@Component({
  selector: 'app-deviation-details',
  templateUrl: './deviation-details.component.html',
  styleUrls: ['./deviation-details.component.scss']
})
export class DeviationDetailsComponent implements OnInit, OnDestroy {

  formDeviations: FormGroup = Object.create(null);

  constructor(private fb: FormBuilder,
    private router: Router,
    private waiverService: CreateWrService) {
  }

  ngOnDestroy() {
    this.waiverService.setDeviations(this.getDeviations());
    this.router.navigate(['create', 'actions']);
  }

  ngOnInit(): void {
    console.log(this.waiverService.wr);
    this.formDeviations = this.fb.group({
      deviations: this.fb.array([]),
    });


    if (this.waiverService.wr?.deviations == null || this.waiverService.wr.deviations.length == 0) {
      this.addDeviation();
    } else {
      this.waiverService.wr.deviations.forEach(d => {
        const deviation = this.fb.group({
          current: [d.current || '', Validators.compose([Validators.required])],
          required: [d.required || '', Validators.compose([Validators.required])],
          reason: [d.reason || '', Validators.compose([Validators.required])]
        });

        this.deviations.push(deviation);
      });
    }

  }

  get deviations(): FormArray {
    return this.formDeviations.get('deviations') as FormArray;
  }

  addDeviation() {
    const deviation = this.fb.group({
      current: ['', Validators.compose([Validators.required])],
      required: ['', Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required])]
    });

    this.deviations.push(deviation);
  }

  deleteDeviation(index): void {
    this.deviations.removeAt(index);
  }

  next() {
    if (this.formDeviations.valid) {
      this.ngOnDestroy();
    } else {
      this.formDeviations.markAllAsTouched();
    }
  }

  getDeviations() {
    let deviations = [];
    this.deviations.value.forEach(d => {
      const deviation: Deviation = {
        current: d['current'],
        required: d['required'],
        reason: d['reason'],
      }
      deviations.push(deviation);
    })

    return deviations;
  }

  check(deviation: FormGroup, field: string): string {
    if (!deviation.controls[field].touched) {
      return '';
    }
    return deviation.controls[field].hasError('required') ? 'is-invalid' : 'is-valid';
  }

  public scroll(): void {
    window.scrollTo(0, 0);
  }

}
