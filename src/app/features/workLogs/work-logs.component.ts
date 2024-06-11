import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work-logs',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './work-logs.component.html',
  styleUrl: './work-logs.component.scss'
})
export class WorkLogsComponent {
  links: any[]
  activatedLink: any

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/workLog/overview',
        index: 0,
        disabled: false
      },
      {
        label: 'Add',
        link: '/workLog/add',
        index: 1,
        disabled: false
      },
      {
        label: 'Edit',
        link: '/workLog/edit/:id',
        index: 2,
        disabled: true
      }
    ]
  }
}
