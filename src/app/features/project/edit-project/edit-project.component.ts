import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, RecruiterService, ClientsService } from '../../../services/services';
import { RecruiterResponse, ClientResponse, ProjectResponse, ProjectRequest } from '../../../services/models';
import { CompareObjectsService } from '../../../shared/utils/compare.objects.service';

@Component({
  selector: 'app-edit-project',
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
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _projectService = inject(ProjectsService)
  private _recruiterService = inject(RecruiterService)
  private _clientService = inject(ClientsService)
  private _compareService = inject(CompareObjectsService)
  private fb = inject(FormBuilder)
  projectForm: FormGroup = this.fb.group({
    clientId: new FormControl('', Validators.required),
    recruiterId: new FormControl(),
    projectName: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
  })

  previousProject: ProjectResponse = {}

  _recruiters: RecruiterResponse[] | undefined = []
  _clients: ClientResponse[] | undefined = []

  constructor() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this._projectService.getProject({
        projectId: id as any
      }).subscribe({
        next: (data) => {
          this.fillForm(data)
          this.previousProject = data
        }
      })
    } else {
      this._router.navigate(['/project/overview'])
    }
  }

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

  fillForm(project: ProjectResponse) {
    this.projectForm = this.fb.group({
      clientId: new FormControl(project.client?.id, Validators.required),
      recruiterId: new FormControl(project.recruiter?.id),
      projectName: new FormControl(project.projectName, Validators.required),
      endDate: new FormControl(project.endDate, Validators.required),
      startDate: new FormControl(project.startDate, Validators.required),
    })
  }

  editProject() {
    const editedProject = this.prepareData()
    if (this.previousProject &&
      !this._compareService.isEqual(editedProject, this.previousProject)
    ) {
      this._projectService.updateProject({
        body: editedProject
      }).subscribe({
        next: () => {
          this._router.navigate(['/project/overview'])
        }
      })
    }
  }

  prepareData() {
    const project: ProjectRequest = {
      clientId: this.projectForm.get('clientId')?.value,
      projectName: this.projectForm.get('projectName')?.value,
      recruiterId: this.projectForm.get('recruiterId')?.value,
      id: this.previousProject.id,
      endDate: this.projectForm.get('endDate')?.value,
      startDate: this.projectForm.get('startDate')?.value,
    }
    return project
  }

  cancel() {
    this._router.navigate(['/project/overview'])
  }
}
