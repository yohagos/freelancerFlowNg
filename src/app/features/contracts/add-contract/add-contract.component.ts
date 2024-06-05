import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractsService } from '../../../services/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContractRequest } from '../../../services/models';

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
    MatInputModule
  ],
  templateUrl: './add-contract.component.html',
  styleUrl: './add-contract.component.scss'
})
export class AddContractComponent implements OnInit{
  private _contractService = inject(ContractsService)
  private fb = inject(FormBuilder)
  contractForm: FormGroup = this.fb.group({
    projectId: new FormControl('', Validators.required),
    onSiteRate: new FormControl(''),
    remoteRate: new FormControl(''),
    endDate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
  })

  ngOnInit() {
      this._contractService.getContracts().subscribe(
        data => console.log(data)
      )
  }

  addContract() {
    if(this.contractForm.valid && this.contractForm.dirty) {
      const req = this.prepareRequest()
      this._contractService.saveContract({
        body: req
      }).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err)
      })
    }
  }

  prepareRequest() {
    const request: ContractRequest = {
      endDate: '',
      projectId: 0,
      startDate: '',
      onSiteRate: 0,
      remoteRate: 0,
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
