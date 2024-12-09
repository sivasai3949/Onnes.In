import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.css']
})
export class AdvisoryComponent implements OnInit{
  getAllAdvisor: any;

  constructor(private formSrvc : FormService){}

  ngOnInit(): void {
    this.getAdvisory();
  }

  getAdvisory(){
    this.formSrvc.getAdvisor().subscribe((res:any)=>{
      this.getAllAdvisor = res;
    })
  }
}
