import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RecruiterService } from '../../../services/services';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecruiterResponse } from '../../../services/models';

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
  private _recruiterService = inject(RecruiterService)
  private fb = inject(FormBuilder)
  recruiterForm: FormGroup = this.fb.group({
    agency: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('')
  })

  ngOnInit() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id !== null) {
      this._recruiterService.getRecruiter({
        recruiterId: id as any
      }).subscribe({
        next: (data) => {
          console.log(data)
          this.fillForm(data)
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

  }

  cancel() {
    this._router.navigate(['/recruiter/overview'])
  }
}
