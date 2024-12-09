import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferingComponent } from './offering/offering.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home', 
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'offering',
    component:OfferingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled',})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
