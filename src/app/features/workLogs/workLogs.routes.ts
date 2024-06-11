import { Routes } from "@angular/router";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { OverviewComponent } from "./overview-log/overview.component";
import { WorkLogsComponent } from "./work-logs.component";
import { AddLogComponent } from "./add-log/add-log.component";
import { EditLogComponent } from "./edit-log/edit-log.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WorkLogsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddLogComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditLogComponent,
        canActivate: [authGuard]
      }
    ]
  },

]
