import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {
  investorData: any[] = [];

  constructor(public formSrvc : FormService){}

  ngOnInit(): void {
    this.getInvestors();
  }

  getInvestors(){
    this.formSrvc.getInvestor().subscribe((res:any)=>{
      this.investorData = res;
    })
  }
}
