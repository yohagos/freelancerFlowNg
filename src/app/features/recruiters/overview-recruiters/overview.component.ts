import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RecruiterService } from '../../../services/services';
import { PageResponseRecruiterResponse, RecruiterResponse } from '../../../services/models';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";


@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule,
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

  recruiterResponse$!: Observable<PageResponseRecruiterResponse>

  open = true

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.recruiterResponse$ = this._recruiterService.getRecruiters({
      page: this.page,
      size: this.size
    })
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex
    this.loadData()
  }

  editRecruiter(id: number | undefined) {
    this._router.navigate(['recruiter/edit', id])
  }

  addRecruiter() {
    this._router.navigate(['/recruiter/add'])
  }

  deleteRecruiter(recruiter: RecruiterResponse) {
    this._confirmDialogService.confirm().subscribe((result) => {
      if (result && recruiter.id != null ) {
        this._recruiterService.deleteRecruiterById({
          recruiterId: recruiter.id
        }).subscribe({
          next: () => {
            this.loadData()
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
  }

  test() {
    this.open = !this.open
    console.log('open')
  }

  test2(x: any) {
    console.log(x)
  }
}
