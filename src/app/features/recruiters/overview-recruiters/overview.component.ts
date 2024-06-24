import { AfterContentInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
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
import { Observable, of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { ThemeService } from '../../../core/theme/theme.service';


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
export class OverviewComponent implements OnInit, AfterContentInit {
  private _router = inject(Router)
  private _recruiterService = inject(RecruiterService)
  private _confirmDialogService = inject(ConfirmDialogService)
  private _themeService = inject(ThemeService)
  private _renderer = inject(Renderer2)

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  recruiterResponse$!: Observable<PageResponseRecruiterResponse>

  open = true

  constructor() {
    /*this._themeService._getColorSubject().subscribe((e) => {
       if (e === 'dark') {
        this._renderer.setStyle(this.footer?.nativeElement, 'background-color', 'var(--primary-dark)')
      } else {
        this._renderer.setStyle(this.footer?.nativeElement, 'background-color', 'var(--primary-light)')
      }

    })*/
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterContentInit(): void {
    const footer = document.getElementById('footer')

    this._themeService._getColorSubject().subscribe((scheme) => {
      if (footer) {
        if (scheme === 'dark') {
          this._renderer.setStyle(footer, 'background-color', 'var(--primary-dark)')
        } else {
          this._renderer.setStyle(footer, 'background-color', 'var(--primary-light)')
        }
      }
    })
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

  deleteRecruiter(recruiter: RecruiterResponse, event: Event) {
    event.stopPropagation()
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

  openList() {
    this.open = !this.open
  }
}
