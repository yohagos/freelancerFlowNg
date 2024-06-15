import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RecruiterService } from '../../../services/services';
import { RecruiterRequest } from '../../../services/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recruiter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './add-recruiter.component.html',
  styleUrl: './add-recruiter.component.scss'
})
export class AddRecruiterComponent {
  private router = inject(Router)
  private _recruiterService = inject(RecruiterService)
  private fb = inject(FormBuilder)
  recruiterForm: FormGroup = this.fb.group({
    agency: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('')
  })

  addRecruiter() {
    if (this.recruiterForm.valid && this.recruiterForm.dirty) {
      const req = this.prepareRequest()
      this._recruiterService.saveRecruiter({
        body: req
      }).subscribe({
        next: (res) => {
          this.router.navigate(['/recruiter'])
        },
        error: (err) => {
          console.error(err.error)
        }
      })
    }
  }

  prepareRequest() {
    const request: RecruiterRequest = {
      agency: this.recruiterForm.get('agency')?.value,
      email: this.recruiterForm.get('email')?.value,
      name: this.recruiterForm.get('name')?.value,
      phone: this.recruiterForm.get('phone')?.value,
      website: this.recruiterForm.get('website')?.value
    }
    return request
  }

  clear() {
    const controls = Object.keys(this.recruiterForm.controls)
    controls.forEach(elem => {
      this.recruiterForm.controls[elem].setValue('')
    })
    this.recruiterForm.markAsUntouched()
  }

}
