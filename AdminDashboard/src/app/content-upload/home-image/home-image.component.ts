import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditHomeImageComponent } from './add-or-edit-home-image/add-or-edit-home-image.component';

@Component({
  selector: 'app-home-image',
  templateUrl: './home-image.component.html',
  styleUrls: ['./home-image.component.css']
})
export class HomeImageComponent implements OnInit{
  homeImageDataSource: any;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog ={} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'image',
    'content',
    'color',
    'order',
    'edit/delete',
  ];
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){

  }
  ngOnInit(): void {
    this.getHomeImageDetails();
  }

  getHomeImageDetails(){
    this.appService.getHomeImage().subscribe({
      next:(res) => {
        this.homeImageDataSource = new MatTableDataSource(res);
        this.homeImageDataSource.paginator = this.paginator;
        this.homeImageDataSource.sort = this.sort;
      }
    })
  }

  deleteHomeImageItem(){
    this.appService.deleteHomeImage(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getHomeImageDetails();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  openAddHomeImageModal(){
    const dialogRef = this.dialog.open(AddOrEditHomeImageComponent,{
      exitAnimationDuration: '1000ms',
      enterAnimationDuration : '1000ms',
      width: 'auto'
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getHomeImageDetails();
    })
  }

  openEditHomeImageModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditHomeImageComponent,{
      exitAnimationDuration: '1000ms',
      enterAnimationDuration : '1000ms',
      width: 'auto',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getHomeImageDetails();
    })
  }
  openDeleteHomeImageConfirm(Id:any){
    this.deleteId = Id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto'
    });

  }

  closeModal(){
    this.dialog.closeAll();
  }

  //Success or error msg dialog after form submissions or performing some actions
  public successMsgDialog(msg: string) {
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
