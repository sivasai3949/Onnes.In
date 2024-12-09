import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit{
  allTechnologyList: any;

  constructor(public formService : FormService){}
  ngOnInit(): void {
    this.getTechnologyData();
  }

  getTechnologyData(){
    this.formService.getOffering().subscribe({
      next:(res)=>{
        this.allTechnologyList = res;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
}
