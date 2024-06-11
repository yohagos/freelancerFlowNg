import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ContractsService, RecruiterService } from '../../../services/services';
import { ContractResponse, PageResponseContractResponse } from '../../../services/models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  private _contractService = inject(ContractsService)
  private _confirmService = inject(ConfirmDialogService)
  contracts: PageResponseContractResponse = {}

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._contractService.getContracts().subscribe({
      next: (data) => {
        this.contracts = data
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

  editContract(id: number | undefined) {
    this._router.navigate(['contract/edit', id])
  }

  deleteContract(contract: ContractResponse) {
    this._confirmService.confirm().subscribe((result) => {
      if (result && contract.id != null) {
        this._contractService.deleteContract({
          contractId: contract.id
        }).subscribe({
          next: () => this.loadData(),
          error: (err) =>  console.log(err)
        })
      }
    })
  }
}
