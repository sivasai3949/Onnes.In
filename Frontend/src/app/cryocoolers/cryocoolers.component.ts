import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-cryocoolers',
  templateUrl: './cryocoolers.component.html',
  styleUrls: ['./cryocoolers.component.css']
})
export class CryocoolersComponent implements OnInit{
  allCrocoolersList: any;

  constructor(public formService : FormService){

  }
  ngOnInit(): void {
    this.getCyocoolers();
  }
  getCyocoolers(){
    this.formService.getOffering().subscribe({
      next:(res)=>{
        this.allCrocoolersList = res;
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
}
