import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, WorkLogService } from '../../../services/services';
import { PageResponseWorkLogResponse, ProjectResponse, WorkLogRequest } from '../../../services/models';
import { CardsComponent } from './cards/cards.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    CardsComponent,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE'
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _workLogService = inject(WorkLogService)
  private _projectService = inject(ProjectsService)
  private _fb = inject(FormBuilder)
  logForm: FormGroup = this._fb.group({
    hoursWorked: new FormControl('', Validators.required),
    isRemote: new FormControl(false),
    notice: new FormControl(''),
    workDate: new FormControl('', Validators.required)
  })

  workLogs: PageResponseWorkLogResponse = {}
  currentProject!: ProjectResponse

  showForm = false

  constructor() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.loadData(id as any)
    } else {
      this._router.navigate(['/project/overview'])
    }
    this._projectService.getProject({
      projectId: id as any
    }).subscribe({
      next: (data) => this.currentProject = data
    })
  }

  ngOnInit() {

  }

  loadData(id: number) {
    this._workLogService.getWorkLogsByProjectId({
      projectId: id as any
    }).subscribe({
      next: (data) => {
        this.workLogs = data
      },
      error: () => this._router.navigate(['/project/overview'])
    })
  }

  createForm() {
    this.showForm = true
  }

  addLog() {
    let editedLog = this.prepareData()
    if (editedLog) {
      this._workLogService.saveWorkLog({
        body: editedLog
      }).subscribe({
        next: () => {
          this.showForm = false
          this.loadData(editedLog.projectId)
        }
      })
    }
  }

  prepareData() {
    if (this.currentProject && this.currentProject.id) {
      let editedLog: WorkLogRequest = {
        projectId: this.currentProject.id,
        isRemote: this.logForm.get('isRemote')?.value,
        hoursWorked: this.logForm.get('hoursWorked')?.value,
        workDate: this.logForm.get('workDate')?.value,
        notice: this.logForm.get('notice')?.value,
      }
      console.log(editedLog)
      return editedLog
    }
    return null
  }

  cancel() {
    this.showForm = false
    const controls = Object.keys(this.logForm.controls)
    controls.forEach(elem => {
      if (elem === 'isRemote') {
        this.logForm.controls[elem].setValue(false)
      } else {
        this.logForm.controls[elem].setValue('')
      }
    })
    this.logForm.markAsUntouched()
  }
}
