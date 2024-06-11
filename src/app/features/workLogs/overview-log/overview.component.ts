import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WorkLogService } from '../../../services/services';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { PageResponseWorkLogResponse } from '../../../services/models';

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
  private _workLogService = inject(WorkLogService)
  private _confirmDialogService = inject(ConfirmDialogService)
  //logs: PageResponseWorkLogResponse = {}

  /*
    Worklog specific for projects
  */

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  ngOnInit() {

  }

  loadData() {
    /* this._workLogService.getWorkLogs().subscribe({
      next: (data) => this.logs = data
    }) */
  }

}
