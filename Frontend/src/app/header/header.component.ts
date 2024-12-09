import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../service/form.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  allnavItemList: any;
  partnerData: any;

  // navBg: any;

  // @HostListener('document:scroll') scrollover(){

  //   if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
  //     this.navBg = {
  //       'background-color':'white',
  //       'color':'red',
  //     }
  //   }else{
  //     this.navBg = {}
  //   } 
  // }

  constructor(
    private activateRoute : ActivatedRoute,
    public formService : FormService,
    ){

  }

  ngOnInit(): void{
    this.activateRoute.fragment.subscribe((value:any)=>{
      console.log(value);
      this.jumpTo(value);
    });
    this.getNavItem();
    this.getPartner();
  }

  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
  }

  getNavItem(){
    this.formService.getNavItem().subscribe({
      next:(res)=>{
        this.allnavItemList = res;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  getPartner(){
    this.formService.getPartner().subscribe((res:any)=>{
      this.partnerData = res;
    })
  }

}
