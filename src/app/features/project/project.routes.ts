import { Routes } from "@angular/router";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { OverviewComponent } from "./overview-project/overview.component";
import { ProjectComponent } from "./project.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ProjectComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditProjectComponent,
        canActivate: [authGuard]
      }
    ]
  },

]
