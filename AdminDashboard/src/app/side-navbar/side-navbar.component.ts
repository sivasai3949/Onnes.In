import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  currentUserData: any;

  constructor(
    public appService: AppService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.openSection('dashboard');
    this.currentUserData = localStorage.getItem('currentUser');
  }

  openSection(sectionName: string) {
    this.appService.dashboard = false;
    this.appService.contactusForm = false;
    this.appService.navItem = false;
    this.appService.aboutUs = false;
    this.appService.team = false;
    this.appService.offering = false;
    this.appService.joinus = false;
    this.appService.homeImage = false;
    this.appService.cfrp = false;


    switch (sectionName) {
      case 'dashboard':
        this.appService.dashboard = true;
        break;
      case 'contactusForm':
        this.appService.contactusForm = true;
        break;
      case 'navItem':
        this.appService.navItem = true;
        break;
      case 'navItem':
        this.appService.homeImage = true;
        break;
      case 'aboutUs':
        this.appService.aboutUs = true;
        break;
      case 'team':
        this.appService.team = true;
        break;
      case 'blogNews':
        this.appService.blogNews = true;
        break;
      case 'offering':
        this.appService.offering = true;
        break;
      case 'cfrp':
        this.appService.cfrp = true;
        break; 
      case 'joinus':
        this.appService.joinus = true;
        break;
    }
  }

  // Signout or Sign In
  public signout() {
    if (localStorage.length) {
      this.appService.signOut = true;
      localStorage.clear();
    } else {
      this.appService.signOut = false;
    }
    this.router.navigateByUrl('');
    this.location.replaceState('/');
  }
}
