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
import { ApiModule } from './modules/api/api.module';
import { SnackbarModule } from './modules/snackbar/snackbar.module';

// APP Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Materials Modules
import { MatCommonModule } from '@angular/material/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

// Components
import { WelcomeComponent } from './welcome/welcome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CareersComponent } from './careers/careers.component';
import { SettingsComponent } from './settings/settings.component';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { AddSmDialogComponent } from './dialog-components/add-sm-dialog/add-sm-dialog.component';
import { RemoveSmDialogComponent } from './dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { RegisterCtDialogComponent } from './dialog-components/register-ct-dialog/register-ct-dialog.component';
import { LoginDialogComponent } from './dialog-components/login-dialog/login-dialog.component';
import { CtManageComponent } from './ct-manage/ct-manage.component';
import { ApproveCtDialogComponent } from './dialog-components/approve-ct-dialog/approve-ct-dialog.component';
import { LogoutDialogComponent } from './dialog-components/logout-dialog/logout-dialog.component';
import { HcpApplicationComponent } from './hcp-application/hcp-application.component';
import { JobListComponent } from './job-list/job-list.component';
import { HomeComponent } from './home/home.component';
import { ApplicationManageComponent } from './application-manage/application-manage.component';
import { AddPostingDialogComponent } from './dialog-components/add-posting-dialog/add-posting-dialog.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ConfirmationDialogComponent } from './dialog-components/confirmation-dialog/confirmation-dialog.component';
import { HcpManageComponent } from './hcp-manage/hcp-manage.component';
import { CtRequestComponent } from './ct-request/ct-request.component';
import { CtRequestManageComponent } from './ct-request-manage/ct-request-manage.component';
import { CtRequestDetailsComponent } from './ct-request-details/ct-request-details.component';
import { CtRequestHcpComponent } from './ct-request-hcp/ct-request-hcp.component';
import { CtRequestCtViewComponent } from './ct-request-ct-view/ct-request-ct-view.component';
import { HcpScheduleComponent } from './hcp-schedule/hcp-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PagenotfoundComponent,
    UserHomeComponent,
    AboutComponent,
    ServicesComponent,
    CareersComponent,
    SettingsComponent,
    StaffManageComponent,
    AddSmDialogComponent,
    RemoveSmDialogComponent,
    RegisterCtDialogComponent,
    LoginDialogComponent,
    CtManageComponent,
    ApproveCtDialogComponent,
    LogoutDialogComponent,
    HcpApplicationComponent,
    JobListComponent,
    HomeComponent,
    ApplicationManageComponent,
    AddPostingDialogComponent,
    ApplicantListComponent,
    ApplicationDetailsComponent,
    ConfirmationDialogComponent,
    HcpManageComponent,
    CtRequestComponent,
    CtRequestManageComponent,
    CtRequestDetailsComponent,
    CtRequestHcpComponent,
    CtRequestCtViewComponent,
    HcpScheduleComponent,
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
    FormattingModule,
    MatSelectModule,
    ApiModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SnackbarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
