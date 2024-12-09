import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

const routes: Routes = [
  {
    path:'',
    title: 'Login',
    component:LoginPageComponent
  },
  {
    path:'dashboard',
    component:SideNavbarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
