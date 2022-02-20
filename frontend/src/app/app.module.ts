// Angular 'Core' Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Misc. Modules
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Custom Modules
import { FormattingModule } from './modules/formatting/formatting.module';

// APP Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Materials Modules
import {MatCommonModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule  } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { SettingsComponent } from './settings/settings.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { AddSmDialogComponent } from './dialog-components/add-sm-dialog/add-sm-dialog.component';
import { RemoveSmDialogComponent } from './dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { RegisterCtDialogComponent } from './dialog-components/add-ct-dialog/register-ct-dialog.component';
import { LoginDialogComponent } from './dialog-components/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagenotfoundComponent,
    UserHomeComponent,
    LogoutComponent,
    AboutComponent,
    ServicesComponent,
    CareersComponent,
    SettingsComponent,
    StaffManageComponent,
    AddSmDialogComponent,
    RemoveSmDialogComponent,
    RegisterCtDialogComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    FormattingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
