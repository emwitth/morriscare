import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components to route to
import { WelcomeComponent } from './welcome/welcome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SettingsComponent } from './settings/settings.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { CtManageComponent } from './ct-manage/ct-manage.component';
import { HcpApplicationComponent } from './hcp-application/hcp-application.component';
import { JobListComponent } from './job-list/job-list.component';
import { HomeComponent } from './home/home.component';
import { ApplicationManageComponent } from './application-manage/application-manage.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { HcpManageComponent } from './hcp-manage/hcp-manage.component';
import { CtRequestComponent } from './ct-request/ct-request.component';
import { CtRequestManageComponent } from './ct-request-manage/ct-request-manage.component';
import { CtRequestDetailsComponent } from './ct-request-details/ct-request-details.component';

const routes: Routes = [
  /* default path */
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      /* UN-LOGGED-IN PATHS */
      { 
        path: 'home', 
        component: WelcomeComponent
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
      { 
        path: 'careers/:type', 
        component: JobListComponent
      },
      { 
        path: 'careers/:type/:id', 
        component: HcpApplicationComponent
      },
    ]
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
      },
      { 
        path: 'manage-hcp', 
        component: HcpManageComponent
      },
      { 
        path: 'applications', 
        component: ApplicationManageComponent
      },
      {
        path: 'applications/:id/applicants',
        component: ApplicationDetailsComponent,
      },
      {
        path: 'manage-ct-request',
        component: CtRequestManageComponent,
      },
      {
        path: 'manage-ct-request/request/:id',
        component: CtRequestDetailsComponent,
      },
      { 
        path: 'settings', 
        component: SettingsComponent
      },
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
      },
      { 
        path: 'manage-hcp', 
        component: HcpManageComponent
      },
      { 
        path: 'applications', 
        component: ApplicationManageComponent,
      },
      {
        path: 'applications/:id/applicants',
        component: ApplicationDetailsComponent,
      },
      {
        path: 'manage-ct-request',
        component: CtRequestManageComponent,
      },
      {
        path: 'manage-ct-request/request/:id',
        component: CtRequestDetailsComponent,
      },
      { 
        path: 'settings', 
        component: SettingsComponent
      },
    ]
  },
   /* hcp paths */
   {
    path: "hcp",
    component: UserHomeComponent,
    children:
    [
      { 
        path: 'settings', 
        component: SettingsComponent
      }
    ]
  },
  /* caretaker paths */
  {
    path: "caretaker",
    component: UserHomeComponent,
    children:
    [
      {
        path: 'request-care',
        component: CtRequestComponent
      },
      { 
        path: 'settings', 
        component: SettingsComponent
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
