import { Routes } from "@angular/router";
import { EditGuard } from "../guards/edit.guard";
import { WaiverDetailsComponent } from "./waiver-details/waiver-details.component";

export const EditRoutes: Routes = [
    {
      path: '',
      canActivate: [EditGuard],
      children: [
        {
          path: 'info',
          component: WaiverDetailsComponent,
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'info'
        }
      ],
    },
  ];