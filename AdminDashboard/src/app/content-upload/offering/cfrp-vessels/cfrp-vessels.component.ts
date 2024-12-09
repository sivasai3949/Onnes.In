import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditCfrpComponent } from './add-or-edit-cfrp/add-or-edit-cfrp.component';

@Component({
  selector: 'app-cfrp-vessels',
  templateUrl: './cfrp-vessels.component.html',
  styleUrls: ['./cfrp-vessels.component.css']
})
export class CfrpVesselsComponent implements OnInit{
  cfrpDataSource: any;
  success: boolean = false;
  err: boolean = false;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;
  
  public displayedColumns = [
    'id',
    'title',
    'content',
    'edit/delete',
  ];
  dialogRef: any;
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){

  }
  ngOnInit(): void {
    this.getCfrpData();
  }
  getCfrpData(){
    this.appService.getCfrp().subscribe({
      next:(res)=>{
        this.cfrpDataSource = new MatTableDataSource(res);
        this.cfrpDataSource.paginator = this.paginator;
        this.cfrpDataSource.sort = this.sort;
      }
    })
  }
  deleteCfrpItem(){
    this.appService.deleteCfrp(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted SuccessFully');
        this.getCfrpData();
      },
      error:(err)=>{
        this.success = false;
        this.success = true;
        this.successMsgDialog(err.message);
      }
    })
  }
  openAddCfrpModal(){
    const  dialogRef = this.dialog.open(AddOrEditCfrpComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getCfrpData();
    })
  }

  openEditCfrpModal(data:any){
    const  dialogRef = this.dialog.open(AddOrEditCfrpComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getCfrpData();
    })
  }
  openDeleteCfrpConfirm(Id:any){
    this.deleteId = Id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getCfrpData();
    })
  }

  closeModal(){
    this.dialog.closeAll();
  }

  successMsgDialog(msg: string) {
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
