import { Component, OnInit, inject } from '@angular/core';
import { ContractRequest, ContractResponse, ProjectResponse } from '../../../services/models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractsService, ProjectsService } from '../../../services/services';
import { CompareObjectsService } from '../../../shared/utils/compare.objects.service';

@Component({
  selector: 'app-edit-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
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
  templateUrl: './edit-contracts.component.html',
  styleUrl: './edit-contracts.component.scss'
})
export class EditContractsComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _projectService = inject(ProjectsService)
  private _contractService = inject(ContractsService)
  private _compareService = inject(CompareObjectsService)
  private fb = inject(FormBuilder)
  contractForm: FormGroup = this.fb.group({
    projectId: new FormControl('', Validators.required),
    onSiteRate: new FormControl(''),
    remoteRate: new FormControl(''),
    endDate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
  })

  previousContract: ContractResponse = {}
  projects: ProjectResponse[] | undefined = []

  constructor() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this._contractService.getContract({
        contractId: id as any
      }).subscribe({
        next: (data) => {
          this.previousContract = data
          this.fillForm(data)
        }
      })
    } else {
      this._router.navigate(['/contract/overview'])
    }
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._projectService.getProjects().subscribe({
      next: (data) => this.projects = data.content
    })
  }

  fillForm(contract: ContractResponse | undefined) {
    this.contractForm = this.fb.group({
      projectId: contract?.project?.id,
      onSiteRate: contract?.onSiteRate,
      remoteRate: contract?.remoteRate,
      endDate: contract?.endDate,
      startDate: contract?.startDate
    })
  }

  editContract() {
    const editedContract = this.prepareData()
    if (this.previousContract &&
      !this._compareService.isEqual(editedContract, this.previousContract)
    ) {
      this._contractService.updateContract({
        body: editedContract
      }).subscribe({
        next: () => {
          this._router.navigate(['/contract/overview'])
        }
      })
    }
  }

  prepareData() {
    const contract: ContractRequest = {
      endDate: this.contractForm.get('endDate')?.value,
      projectId: this.contractForm.get('projectId')?.value,
      startDate: this.contractForm.get('startDate')?.value,
      id: this.previousContract.id,
      onSiteRate: this.contractForm.get('onSiteRate')?.value,
      remoteRate: this.contractForm.get('remoteRate')?.value,
    }
    return contract
  }

  cancel() {
    this._router.navigate(['/contract/overview'])
  }
}
