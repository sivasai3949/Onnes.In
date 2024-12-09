import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit{
  partnerData: any;

  constructor(private formSrvc : FormService){}

  ngOnInit(): void {
    this.getPartnerdata();
  }

  getPartnerdata(){
    this.formSrvc.getPartner().subscribe((res:any)=>{
      this.partnerData = res;
    })
  }
}
