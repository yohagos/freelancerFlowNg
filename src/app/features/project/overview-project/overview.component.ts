import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../services/services';
import { PageResponseProjectResponse, ProjectResponse } from '../../../services/models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  private _router = inject(Router)
  private _projectService = inject(ProjectsService)
  private _confirmDialogService = inject(ConfirmDialogService)
  projects: PageResponseProjectResponse = {}

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex
    this.loadData()
  }

  editProject(id: number | undefined) {
    this._router.navigate([`project/edit`, id])
  }

  deleteProject(project: ProjectResponse) {
    this._confirmDialogService.confirm().subscribe((result) => {
      if (result && project.id != null) {
        this._projectService.deleteProject({
          projectId: project.id
        }).subscribe({
          next: () => this.loadData,
          error: (err) => console.log(err)
        })
      }
    })
  }
}
