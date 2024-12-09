import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { FounderComponent } from './founder/founder.component';
import { TechnologyComponent } from './technology/technology.component';
import { CryocoolersComponent } from './cryocoolers/cryocoolers.component';
import { BlogNewsComponent } from './blog-news/blog-news.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfferingComponent } from './offering/offering.component';
import { CfrpVesselsComponent } from './offering/cfrp-vessels/cfrp-vessels.component';
import { PartnerComponent } from './partner/partner.component';
import { AdvisoryComponent } from './advisory/advisory.component';
import { InvestorsComponent } from './investors/investors.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    FounderComponent,
    TechnologyComponent,
    CryocoolersComponent,
    BlogNewsComponent,
    JoinUsComponent,
    ContactComponent,
    OfferingComponent,
    CfrpVesselsComponent,
    PartnerComponent,
    AdvisoryComponent,
    InvestorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
