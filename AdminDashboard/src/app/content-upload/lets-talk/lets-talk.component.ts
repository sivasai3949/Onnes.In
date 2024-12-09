import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditTalkComponent } from './add-or-edit-talk/add-or-edit-talk.component';

@Component({
  selector: 'app-lets-talk',
  templateUrl: './lets-talk.component.html',
  styleUrls: ['./lets-talk.component.css']
})
export class LetsTalkComponent implements OnInit{
  letsTalkDataSource: any = FormGroup;
  success: boolean = false;
  err: boolean = false;
  letsTalkData: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;
  
  public displayedColumns = [
    'id',
    'name',
    'address',
    'edit/delete',
  ];
  dialogRef: any;
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){}

  ngOnInit(): void {
    this.getLetsTalk();
  }

  getLetsTalk(){
    this.appService.getLetsTalk().subscribe({
      next:(res)=>{
        this.letsTalkData = res;
        this.letsTalkDataSource = new MatTableDataSource(this.letsTalkData);
        this.letsTalkDataSource.paginator = this.paginator;
        this.letsTalkDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteTalkItem(){
    this.appService.deleteLetsTalk(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted SuccessFully');
        this.getLetsTalk();
      },
      error:(err)=>{
        this.success = false;
        this.success = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  openAddLetsTalkModal(){
    const  dialogRef = this.dialog.open(AddOrEditTalkComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getLetsTalk();
    })
  }
  openEditTalkModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditTalkComponent,{
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getLetsTalk();
    })
  }

  openDeleteTalkConfirm(id: number){
    this.deleteId = id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getLetsTalk();
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
