import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ClientResponse, ProjectRequest, RecruiterResponse } from '../../../services/models';
import { ClientsService, ProjectsService, RecruiterService } from '../../../services/services';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-add-project',
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
      useValue: 'de-DE'
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  private router = inject(Router)
  private _projectService = inject(ProjectsService)
  private _recruiterService = inject(RecruiterService)
  private _clientService = inject(ClientsService)
  private fb = inject(FormBuilder)
  projectForm: FormGroup = this.fb.group({
    clientId: new FormControl('', Validators.required),
    recruiterId: new FormControl(),
    projectName: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
  })

  _recruiters: RecruiterResponse[] | undefined = []
  _clients: ClientResponse[] | undefined = []

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._clientService.getClients().subscribe({
      next: (data) => this._clients = data.content
    })
    this._recruiterService.getRecruiters().subscribe({
      next: (data) => this._recruiters = data.content
    })
  }

  addProject() {
    if (this.projectForm.valid && this.projectForm.dirty) {
      const req = this.prepareRequest()
      this._projectService.saveProject({
        body: req
      }).subscribe({
        next: () => this.router.navigate(['/project/overview']),
        error: (err) => console.log(err)
      })
    }
  }

  prepareRequest() {
    const request: ProjectRequest = {
      clientId: this.projectForm.get('clientId')?.value,
      projectName: this.projectForm.get('projectName')?.value,
      endDate: this.projectForm.get('endDate')?.value,
      startDate: this.projectForm.get('startDate')?.value,
      recruiterId: this.projectForm.get('recruiterId')?.value,
    }
    return request
  }

  clear() {
    const controls = Object.keys(this.projectForm.controls)
    controls.forEach(elem => {
      this.projectForm.controls[elem].setValue('')
    })
    this.projectForm.markAsUntouched()
  }

}
