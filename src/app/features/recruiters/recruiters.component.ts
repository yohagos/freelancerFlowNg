import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruiters',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss'
})
export class RecruitersComponent {
  links: any[]
  activatedLink: any

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/recruiter/overview',
        index: 0,
        disabled: false
      },
      {
        label: 'Add',
        link: '/recruiter/add',
        index: 1,
        disabled: false
      },
      {
        label: 'Edit',
        link: '/recruiter/edit/:id',
        index: 2,
        disabled: true
      }
    ]
  }
}
