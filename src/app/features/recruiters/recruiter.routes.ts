import { Routes } from "@angular/router";
import { AddRecruiterComponent } from "./add-recruiter/add-recruiter.component";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { OverviewComponent } from "./overview-recruiters/overview.component";
import { EditRecruiterComponent } from "./edit-recruiter/edit-recruiter.component";


export const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        component: AddRecruiterComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditRecruiterComponent,
        canActivate: [authGuard]
      }
    ]
  },

]
