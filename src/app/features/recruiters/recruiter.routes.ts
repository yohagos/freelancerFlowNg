import { Routes } from "@angular/router";
import { AddRecruiterComponent } from "./add-recruiter/add-recruiter.component";
import { authGuard } from "../../core/auth-guard/auth.guard";
import { RecruitersComponent } from "./recruiters.component";
import { OverviewComponent } from "./overview/overview.component";
import { EditRecruiterComponent } from "./edit-recruiter/edit-recruiter.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RecruitersComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [authGuard]
      },
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
