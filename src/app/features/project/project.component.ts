import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  links: any[]
  activatedLink: any

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/contract/overview',
        index: 0,
        disabled: false
      },
      {
        label: 'Add',
        link: '/contract/add',
        index: 1,
        disabled: false
      },
      {
        label: 'Edit',
        link: '/contract/edit/:id',
        index: 2,
        disabled: true
      }
    ]
  }
}
