import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components to route to
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SettingsComponent } from './settings/settings.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { CtManageComponent } from './ct-manage/ct-manage.component';

const routes: Routes = [
  /* default path */
  { 
    path: '', 
    component: HomeComponent
  },
  /* UN-LOGGED-IN PATHS */
  { 
    path: 'settings', 
    component: SettingsComponent
  },
  {
    path: 'about', 
    component: AboutComponent
  },
  { 
    path: 'services', 
    component: ServicesComponent
  },
  { 
    path: 'careers', 
    component: CareersComponent
  },
  /* LOGGED IN PATHS */
  /* staff member paths */
  {
    path: 'staff',
    component: UserHomeComponent,
    children: [
      { 
        path: 'manage-care-taker', 
        component: CtManageComponent
      }
    ]
  },
  /* admin paths */
  {
    path: 'admin',
    component: UserHomeComponent,
    children: [
      { 
        path: 'manage-staff', 
        component: StaffManageComponent
      },
      { 
        path: 'manage-care-taker', 
        component: CtManageComponent
      }
    ]
  },
  /* catchall path */
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
