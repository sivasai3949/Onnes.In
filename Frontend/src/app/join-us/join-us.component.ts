import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent implements OnInit{
  allJoinUsList: any;

  constructor(public formService : FormService){}
  ngOnInit(): void {
    this.getJoinUsData();
  }

  getJoinUsData(){
    this.formService.getJoinUs().subscribe({
      next:(res)=>{
        this.allJoinUsList = res;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
}
