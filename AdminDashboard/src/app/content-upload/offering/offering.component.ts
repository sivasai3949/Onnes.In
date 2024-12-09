import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from 'src/app/app.service';
import { AddOrEditOfferingComponent } from './add-or-edit-offering/add-or-edit-offering.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.css']
})
export class OfferingComponent implements OnInit{
  offeringDataSource: any;
  success : boolean = false;
  err : boolean = false;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') deleteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'title',
    'image',
    'content',
    'edit/delete',
  ];
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){}

  ngOnInit(): void {
    this.getOfferingData();
  }

  getOfferingData(){
    this.appService.getOffering().subscribe({
      next:(res)=>{
        this.offeringDataSource = new MatTableDataSource(res);
        this.offeringDataSource.paginator = this.paginator;
        this.offeringDataSource.sort = this.sort;
      }
    })
  }

  deleteAboutItem(){
    this.appService.deleteOffering(this.deleteId).subscribe({
        next:(res)=>{
          this.closeModal();
          this.success = true;
          this.err = false;
          this.successMsgDialog('Deleted Successfully');
          this.getOfferingData();
        },
        error:(err)=>{
          this.success = false;
          this.err = true;
          this.successMsgDialog(err.message);
        }
    })
  }

  openAddOfferingModal(){
    const dialogRef = this.dialog.open(AddOrEditOfferingComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getOfferingData();
    })
  }

  openEditOfferingModal(data:any){
    const dialogRef = this.dialog.open(AddOrEditOfferingComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data,
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getOfferingData();
    })
  }

  openDeleteOfferingConfirm(Id:any){
    this.deleteId  = Id;
    const dialogRef = this.dialog.open(this.deleteDialog,{
      width:'auto',
    })
  }

  closeModal(){
    this.dialog.closeAll();
  }

  successMsgDialog(msg:any){
    this.appService.httpClientMsg = msg;
    const timeout = 1000;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }
  
}
