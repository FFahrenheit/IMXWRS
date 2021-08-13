import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.scss']
})
export class RiskAnalysisComponent implements OnInit {

  riskDetails: FormGroup = Object.create(null);
  number: string;
  private riskAnalysis: File;

  constructor(private fb: FormBuilder,
    private router: Router,
    private editService: EditService) {
  }

  ngOnDestroy() {
    this.editService.changeRisks(this.getForm());
    // this.editService.changeWaivers(this.getDeviations());
    this.editService.attachRiskAnalysis(this.riskAnalysis);
    console.log(this.editService.wr);
    this.router.navigate(['edit', this.number, 'confirm']);
  }

  public fileEvent($event) {
    if ($event.target.files.length > 0) {
      this.riskAnalysis = $event.target.files[0] as File;
      this.riskDetails.controls['riskAnalysis'].setValue(this.riskAnalysis.name);
    } else {
      this.riskAnalysis = $event.target.files[0] as File;
      this.riskDetails.controls['riskAnalysis'].setValue('');
    }
  }

  getForm() {
    let body = this.riskDetails.value;
    if (body.requiredCorrectiveAction == 'other') {
      body.requiredCorrectiveAction = body.auxAction;
    }
    delete body.auxAction;
    return body;
  }

  ngOnInit(): void {

    this.number = this.editService.getWaiver()['number'];

    this.riskDetails = this.fb.group({
      riskAnalysis: [this.editService.wr?.riskAnalysis || '', Validators.compose([Validators.required])],
      rpnBefore: [this.editService.wr?.rpnBefore || '0', Validators.compose([Validators.required])],
      rpnAfter: [this.editService.wr?.rpnAfter || '0', Validators.compose([Validators.required])],
      originalRisk: [this.editService.wr?.originalRisk || '', Validators.compose([Validators.required])],
      currentRisk: [this.editService.wr?.currentRisk || '', Validators.compose([Validators.required])],
      riskWithActions: [this.editService.wr?.riskWithActions || '', Validators.compose([Validators.required])],
      requiredCorrectiveAction: [this.getRequiredAction() || '', Validators.compose([Validators.required])],
      auxAction: [this.editService.wr?.requiredCorrectiveAction || '']
    });

    this.riskDetails.get('requiredCorrectiveAction').valueChanges.subscribe(action => {
      if (action == 'other') {
        this.riskDetails.controls['auxAction'].setValidators([Validators.required]);
      } else {
        this.riskDetails.controls['auxAction'].clearValidators();
      }
      this.riskDetails.controls['auxAction'].updateValueAndValidity();
    });

  }

  getRequiredAction() {
    if (this.editService.wr?.requiredCorrectiveAction == null) {
      return '';
    } else {
      let action = this.editService.wr?.requiredCorrectiveAction;
      if (action != 'PDCA' && action != '8DS' && action != 'A3') {
        return 'other';
      }
      return action;
    }
  }

  next() {
    if (this.riskDetails.valid) {
      this.ngOnDestroy();
    } else {
      this.riskDetails.markAllAsTouched();
    }
  }

  getVal(field) {
    return this.riskDetails.controls[field].value;
  }

  getStyle(field) {
    if (!this.riskDetails.controls[field].touched) {
      return '';
    }
    return (this.riskDetails.controls[field].valid) ? 'is-valid' : 'is-invalid';
  }

  public scroll(): void {
    window.scrollTo(0, 0);
  }

}
