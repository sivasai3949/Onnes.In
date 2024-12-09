import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  allAboutUsList: any;

  constructor(
    public formService : FormService,
  ){

  }

  ngOnInit(): void {
    this.getAboutUsData();
  }

  getAboutUsData(){
    this.formService.getAboutUs().subscribe({
      next:(res)=>{
        this.allAboutUsList = res;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
}
