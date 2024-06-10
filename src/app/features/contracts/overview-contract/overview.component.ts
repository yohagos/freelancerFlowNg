import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ContractsService, RecruiterService } from '../../../services/services';
import { ContractResponse, PageResponseContractResponse } from '../../../services/models';

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
  private _contractService = inject(ContractsService)
  contracts: PageResponseContractResponse = {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._contractService.getContracts().subscribe({
      next: (data) => {
        this.contracts = data
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
