import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.css']
})
export class OfferingComponent implements OnInit{
  allCfrpList: any;
  allCfrpContent: any;
  currentItem: any;
  selectContentList: any;
  selectAllContent: any;


  constructor(
    public formService : FormService,
    public activateRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activateRoute.fragment.subscribe((res:any)=>{
      console.log(res);
      this.currentItem = res;
      this.getCfrpData();
      this.getCfrPContent();
    })
    
    
    
  }

  getCfrPContent(){
    this.formService.getCfrpData().subscribe({
      next:(res)=>{
        this.allCfrpContent = res;
        this.selectAllContent = [];
        for(let item of this.allCfrpContent){
          if(item.name === this.currentItem){
            this.selectAllContent.push(item);
            console.log(this.selectAllContent)
          }
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  getCfrpData(){
    
    this.formService.getOffering().subscribe({
      next:(res)=>{
        this.allCfrpList = res;
        this.selectContentList = [];
        for(let item of this.allCfrpList){
          if(item.title === this.currentItem){
            this.selectContentList.push(item);
          }
        }
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
}
