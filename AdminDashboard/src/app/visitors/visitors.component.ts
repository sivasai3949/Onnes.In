import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from '../app.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit{

  visitorDataSource: any;
  visitorsData: any;

  public displayedColumns = [
    'id',
    'ip',
    'city',
    'region',
    'postal',
    'country',
    // 'latitude',
    // 'longitude',
    'createdOn',
  ];
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );


  constructor(
    private appSrvc : AppService
  ){}

ngOnInit(): void {
  this.getVisitorDatails();
}
  getVisitorDatails(){
    this.appSrvc.getVisitorsData().subscribe((res:any)=>{
      this.visitorsData = res.reverse();
      this.visitorDataSource = new MatTableDataSource(this.visitorsData);
      this.visitorDataSource.paginator = this.paginator;
      this.visitorDataSource.sort = this.sort;
    })
  }
}
