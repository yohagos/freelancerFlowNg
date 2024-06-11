import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RecruiterService } from '../../../services/services';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecruiterRequest, RecruiterResponse } from '../../../services/models';
import { CompareObjectsService } from '../../../shared/utils/compare.objects.service';


@Component({
  selector: 'app-edit-recruiter',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-recruiter.component.html',
  styleUrl: './edit-recruiter.component.scss'
})
export class EditRecruiterComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _compareService = inject(CompareObjectsService)
  private _recruiterService = inject(RecruiterService)
  private fb = inject(FormBuilder)
  recruiterForm: FormGroup = this.fb.group({
    agency: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('')
  })

  previousRecruiter!: RecruiterResponse

  ngOnInit() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id !== null) {
      this._recruiterService.getRecruiter({
        recruiterId: id as any
      }).subscribe({
        next: (data) => {
          this.fillForm(data)
          this.previousRecruiter = data
        }
      })
    }

    
  }

  fillForm(recruiter: RecruiterResponse) {
    this.recruiterForm = this.fb.group({
      agency: new FormControl(recruiter.agency, Validators.required),
      email: new FormControl(recruiter.email, [Validators.required, Validators.email]),
      name: new FormControl(recruiter.name, Validators.required),
      phone: new FormControl(recruiter.phone, Validators.required),
      website: new FormControl(recruiter.website)
    })
  }

  editRecruiter() {
    let editedRecruiter = this.prepareData()
    if (this.previousRecruiter &&
      !this._compareService.isEqual(editedRecruiter, this.previousRecruiter)
    ) {
      this._recruiterService.updateRecruiter({
        body: editedRecruiter
      }).subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (err) => console.log(err)
      })
    }
  }

  prepareData() {
    const recruiter: RecruiterRequest = {
      agency: this.recruiterForm.get('agency')?.value,
      email: this.recruiterForm.get('email')?.value,
      name: this.recruiterForm.get('name')?.value,
      phone: this.recruiterForm.get('phone')?.value,
      website: this.recruiterForm.get('website')?.value,
      id: this.previousRecruiter.id
    }
    return recruiter
  }

  compareRecruiters() {}

  cancel() {
    this._router.navigate(['/recruiter/overview'])
  }
}
