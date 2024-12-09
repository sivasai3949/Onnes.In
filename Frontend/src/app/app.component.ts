import { Component } from '@angular/core';
import { FormService } from './service/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onnes';
  loader = true ;
  visitorDetails: any;

  constructor(private frmSrvc : FormService){}

  ngOnInit(): void{
    setTimeout(()=>{
      this.loader = false;
    },1000);

    this.frmSrvc.getIpAddress().subscribe((res:any)=>{
      localStorage.setItem('visitorDetails', JSON.stringify(res));
      
      setTimeout(() => {
        this.submitVisitorDetails();
      }, 5000);
    });
    

    // this.submitVisitorDetails();
  }

  submitVisitorDetails(){
    this.visitorDetails = localStorage.getItem('visitorDetails');
    const visitorData = JSON.parse(this.visitorDetails);
    console.log(visitorData);

    if(visitorData){
      // debugger;
      const { ip, city, region, postal, country_name, latitude, longitude } = visitorData;
      const dataToSend = { 
        iPaddress: ip,
      city: city,
      region: region,
      post_code: postal,
      country: country_name,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      }; 
      // this.frmSrvc.sendVisitorData(dataToSend).subscribe((res:any)=>{
      //   console.log(res);
      //   console.log("success");
      //   localStorage.removeItem('visitorDetails');
      // })
    }

  }
}
