import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactusFormComponent } from './contactus-form/contactus-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { NavItemComponent } from './content-upload/nav-item/nav-item.component';
import { AddOrEditNavItemComponent } from './content-upload/nav-item/add-or-edit-nav-item/add-or-edit-nav-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { AboutusComponent } from './content-upload/aboutus/aboutus.component';
import { AddOrEditAboutusComponent } from './content-upload/aboutus/add-or-edit-aboutus/add-or-edit-aboutus.component';
import { TeamComponent } from './content-upload/team/team.component';
import { AddOrEditTeamComponent } from './content-upload/team/add-or-edit-team/add-or-edit-team.component';
import { BlogNewsComponent } from './content-upload/blog-news/blog-news.component';
import { AddOrEditBlogNewsComponent } from './content-upload/blog-news/add-or-edit-blog-news/add-or-edit-blog-news.component';
import { OfferingComponent } from './content-upload/offering/offering.component';
import { AddOrEditOfferingComponent } from './content-upload/offering/add-or-edit-offering/add-or-edit-offering.component';
import { JoinUsComponent } from './content-upload/join-us/join-us.component';
import { AddOrEditJoinUsComponent } from './content-upload/join-us/add-or-edit-join-us/add-or-edit-join-us.component';
import { HomeImageComponent } from './content-upload/home-image/home-image.component';
import { AddOrEditHomeImageComponent } from './content-upload/home-image/add-or-edit-home-image/add-or-edit-home-image.component';
import { CfrpVesselsComponent } from './content-upload/offering/cfrp-vessels/cfrp-vessels.component';
import { AddOrEditCfrpComponent } from './content-upload/offering/cfrp-vessels/add-or-edit-cfrp/add-or-edit-cfrp.component';
import { MatSelectModule } from '@angular/material/select';
import { PartnerComponent } from './content-upload/partner/partner.component';
import { AddOrEditPartnerComponent } from './content-upload/partner/add-or-edit-partner/add-or-edit-partner.component';
import { AdvisoryComponent } from './content-upload/team/advisory/advisory.component';
import { AddOrEditAdvisoryComponent } from './content-upload/team/advisory/add-or-edit-advisory/add-or-edit-advisory.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { InvestorsComponent } from './content-upload/investors/investors.component';
import { LetsTalkComponent } from './content-upload/lets-talk/lets-talk.component';
import { AddOrEditInvestorsComponent } from './content-upload/investors/add-or-edit-investors/add-or-edit-investors.component';
import { AddOrEditTalkComponent } from './content-upload/lets-talk/add-or-edit-talk/add-or-edit-talk.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SideNavbarComponent,
    ContactusFormComponent,
    DashboardComponent,
    NavItemComponent,
    AddOrEditNavItemComponent,
    AboutusComponent,
    AddOrEditAboutusComponent,
    TeamComponent,
    AddOrEditTeamComponent,
    BlogNewsComponent,
    AddOrEditBlogNewsComponent,
    OfferingComponent,
    AddOrEditOfferingComponent,
    JoinUsComponent,
    AddOrEditJoinUsComponent,
    HomeImageComponent,
    AddOrEditHomeImageComponent,
    CfrpVesselsComponent,
    AddOrEditCfrpComponent,
    PartnerComponent,
    AddOrEditPartnerComponent,
    AdvisoryComponent,
    AddOrEditAdvisoryComponent,
    VisitorsComponent,
    InvestorsComponent,
    LetsTalkComponent,
    AddOrEditInvestorsComponent,
    AddOrEditTalkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
