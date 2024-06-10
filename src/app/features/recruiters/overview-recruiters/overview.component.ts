import { Component, Inject, OnInit, inject } from '@angular/core';
import { RecruiterService } from '../../../services/services';
import { PageResponseRecruiterResponse, RecruiterResponse } from '../../../services/models';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';


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
  private _recruiterService = inject(RecruiterService)
  private _confirmDialogService = inject(ConfirmDialogService)

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  recruiters: PageResponseRecruiterResponse = {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._recruiterService.getRecruiters({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.recruiters = data
      },
      error: (err) => console.log(err)
    })
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex
    this.loadData()
  }

  editRecruiter(id: number | undefined) {
    this._router.navigate(['recruiter/edit', id])
  }

  deleteRecruiter(recruiter: RecruiterResponse) {
    this._confirmDialogService.confirm().subscribe((result) => {
      if (result && recruiter.id != null ) {
        this._recruiterService.deleteRecruiterById({
          recruiterId: recruiter.id
        }).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
  }
}
