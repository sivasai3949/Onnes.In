// import { Component, OnInit } from '@angular/core';
// import { FormService } from '../service/form.service';

// @Component({
//   selector: 'app-founder',
//   templateUrl: './founder.component.html',
//   styleUrls: ['./founder.component.css']
// })
// export class FounderComponent implements OnInit{
//   allTeamList: any;

//   constructor(public formService : FormService){}

//   ngOnInit(): void {
//     this.getTeamData();
//   }
//   getTeamData(){
//     this.formService.getTeam().subscribe({
//       next:(res)=>{
//         this.allTeamList = res;
//       },
//       error:(err)=>{
//         console.log(err.message);
//       }
//     })
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-founder',
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.css']
})
export class FounderComponent implements OnInit {
  allTeamList: any;

  constructor(public formService: FormService) { }

  ngOnInit(): void {
    this.getTeamData();
  }

  getTeamData() {
    this.formService.getTeam().subscribe({
      next: (res) => {
        this.allTeamList = res.map((team: any) => ({ ...team, showFullDescription: false }));
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  toggleDescription(team: any) {
    team.showFullDescription = !team.showFullDescription;
  }
}
