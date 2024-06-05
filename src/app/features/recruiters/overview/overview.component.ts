import { Component, Inject, OnInit, inject } from '@angular/core';
import { RecruiterService } from '../../../services/services';
import { RecruiterResponse } from '../../../services/models';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  private _router = inject(Router)
  private _recruiterService = inject(RecruiterService)
  recruiters: RecruiterResponse[] = []

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._recruiterService.getRecruiters().subscribe({
      next: (data) => {
        this.recruiters = data
      },
      error: (err) => console.log(err)
    })
  }

  editRecruiter(id: number | undefined) {
    this._router.navigate(['recruiter/edit', id])
  }
}
