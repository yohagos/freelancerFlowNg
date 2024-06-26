import { Routes } from "@angular/router";
import { AddContractComponent } from "./add-contract/add-contract.component";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { ContractsComponent } from "./contracts.component";
import { OverviewComponent } from "./overview-contract/overview.component";
import { EditContractsComponent } from "./edit-contracts/edit-contracts.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContractsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddContractComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditContractsComponent,
        canActivate: [authGuard]
      }
    ]
  },
]
