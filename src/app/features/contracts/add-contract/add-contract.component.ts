import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractsService, ProjectsService } from '../../../services/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContractRequest, ProjectResponse } from '../../../services/models';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ge-DE'
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './add-contract.component.html',
  styleUrl: './add-contract.component.scss'
})
export class AddContractComponent implements OnInit {
  private _router = inject(Router)
  private _contractService = inject(ContractsService)
  private _projectService = inject(ProjectsService)
  private fb = inject(FormBuilder)
  contractForm: FormGroup = this.fb.group({
    projectId: new FormControl('', Validators.required),
    onSiteRate: new FormControl(''),
    remoteRate: new FormControl(''),
    endDate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
  })

  projects: ProjectResponse[] | undefined

  ngOnInit() {
    this._projectService.getProjects().subscribe({
      next: (data) => this.projects = data.content
    })
  }

  addContract() {
    if(this.contractForm.valid && this.contractForm.dirty) {
      const req = this.prepareRequest()
      this._contractService.saveContract({
        body: req
      }).subscribe({
        next: () => this._router.navigate(['/contract/overview']),
        error: (err) => console.log(err)
      })
    }
  }

  prepareRequest() {
    const request: ContractRequest = {
      endDate: this.contractForm.get('endDate')?.value,
      projectId: this.contractForm.get('projectId')?.value,
      startDate: this.contractForm.get('startDate')?.value,
      onSiteRate: this.contractForm.get('onSiteRate')?.value,
      remoteRate: this.contractForm.get('remoteRate')?.value,
    }
    return request
  }

  clear() {
    const controls = Object.keys(this.contractForm)
    controls.forEach(elem => {
      this.contractForm.controls[elem].setValue('')
    })
    this.contractForm.markAsUntouched()
  }

}
