import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit{
getHomeImageList: any;
sortedHomeImageList : any;

constructor(
  public formService : FormService,
){

}
ngOnInit(): void {
  this.clickFun();
  this.getHomeImageData();
}

getHomeImageData(){
  this.formService.getHomeImage().subscribe({
    next:(res)=>{
      this.getHomeImageList = res;
      console.log(this.getHomeImageList);
      this.sortedHomeImageList = this.getHomeImageList.sort((a:any, b:any) => a.order - b.order);
    },
    error:(err)=>{
      console.log(err.message);
    }
  })
}
clickFun(){
  setTimeout(function(){
    document.getElementById('next')?.click();
  },5000);
}
}
