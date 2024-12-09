import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact_us } from '../app.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-contactus-form',
  templateUrl: './contactus-form.component.html',
  styleUrls: ['./contactus-form.component.css']
})
export class ContactusFormComponent implements OnInit {

  contactUsSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public contactUsData: any;
  public contactUsDataSource: MatTableDataSource<any>;
  public displayedColumns = [
    'id',
    'name',
    'mailID',
    'yourMessage',
    'createdOn',
  ];
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );


  constructor(
    public appService: AppService,
  ) {
    this.contactUsDataSource = new MatTableDataSource(this.contactUsData);
  }

  ngOnInit(): void {
    this.getContactDetails();
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.contactUsSearchDateRange.controls['start'].value;
    const toDate = this.contactUsSearchDateRange.controls['end'].value;
    this.tempData = this.contactUsData;
    let selectedItems: Contact_us[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Contact_us) => {
        if (
          new Date(item.date) >= new Date(fromDate) &&
          new Date(item.date) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.contactUsDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.contactUsSearchDateRange.reset();
    this.contactUsDataSource.data = this.contactUsData;
  }

  // Search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contactUsDataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.contactUsDataSource.paginator = this.paginator;
    this.contactUsDataSource.sort = this.sort;
  }

  // get contact form data
  public getContactDetails() {
    this.appService.getContactUsDetails().subscribe((res: any) => {
      this.contactUsData = res;
      this.contactUsDataSource = new MatTableDataSource(this.contactUsData);
      this.contactUsDataSource.paginator = this.paginator;
      this.contactUsDataSource.sort = this.sort;
    })
  }


  //On clicking Export button, exporting to excel
  public ExportTOExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Id', 'Name', 'MailID', 'About', 'Question', 'created On']
    };
    const exportData = this.contactUsDataSource.data.map((data) => {
      return {
        id: data.id,
        name: data.name,
        mailID: data.mailID,
        questions_Type: data.questions_Type,
        yourMessage: data.yourMessage,
        createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'contactUsDetailsReport', options);
  }
}
