import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components to route to
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'home', 
    component: UserHomeComponent
  },
  { 
    path: 'logout', 
    component: LogoutComponent
  },
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
