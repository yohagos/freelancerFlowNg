import { Routes } from "@angular/router";
import { AddContractComponent } from "./add-contract/add-contract.component";
import { authGuard } from "../../core/auth-guard/auth.guard";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddContractComponent,
    canActivate: [authGuard]
  }
]
