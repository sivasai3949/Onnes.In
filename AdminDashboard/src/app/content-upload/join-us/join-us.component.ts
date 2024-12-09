import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditJoinUsComponent } from './add-or-edit-join-us/add-or-edit-join-us.component';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent implements OnInit{
  joinUsDataSource: any;
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
    'content',
    'mail',
    'edit/delete',
  ];
  dialogRef: any;
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){}

  ngOnInit(): void {
    this.getJoinUsData();
  }

  getJoinUsData(){
    this.appService.getJoinUs().subscribe({
      next:(res)=>{
        this.joinUsDataSource = new MatTableDataSource(res);
        this.joinUsDataSource.paginator = this.paginator;
        this.joinUsDataSource.sort = this.sort;
      }
    })
  }

  deleteJoinUsItem(){
    this.appService.deletejoinUs(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted SuccessFully');
        this.getJoinUsData();
      },
      error:(err)=>{
        this.success = false;
        this.success = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  openAddJoinUsModal(){
    const  dialogRef = this.dialog.open(AddOrEditJoinUsComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getJoinUsData();
    })
  }

  openEditJoinModal(data:any){
    const  dialogRef = this.dialog.open(AddOrEditJoinUsComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getJoinUsData();
    })
  }

  openDeleteJoinConfirm(Id:any){
    this.deleteId = Id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getJoinUsData();
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
