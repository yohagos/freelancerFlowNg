import { Routes } from "@angular/router";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { OverviewComponent } from "./overview-client/overview.component";
import { ClientComponent } from "./client.component";
import { AddClientComponent } from "./add-client/add-client.component";
import { EditClientComponent } from "./edit-client/edit-client.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ClientComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddClientComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditClientComponent,
        canActivate: [authGuard]
      }
    ]
  },

]
