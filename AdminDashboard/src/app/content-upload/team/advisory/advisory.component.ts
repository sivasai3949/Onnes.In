import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditAdvisoryComponent } from './add-or-edit-advisory/add-or-edit-advisory.component';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.css']
})
export class AdvisoryComponent {
  advisoryDataSource: any;
  success : boolean = false;
  err : boolean = false;
  dialogRef : any;
  allAdvisoryList: any;
  deleteId: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') deleteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'name',
    'img',
    'desg',
    'about',
    'link',
    'edit/delete',
  ];

  constructor(
    public appService : AppService,
    private dialog : MatDialog,
  ){
    this.getAdvisory();
    this.advisoryDataSource = new MatTableDataSource(this.allAdvisoryList);
  }

  getAdvisory(){
    this.appService.getAdvisory().subscribe({
      next:(res:any)=>{
        this.allAdvisoryList = res;
        this.advisoryDataSource = new MatTableDataSource(res);
        this.advisoryDataSource.paginator = this.paginator;
        this.advisoryDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    });
  }

  deleteAdvisoryItem(){
    this.appService.deleteAdvisory(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.succeessMsgDialog('Deleted Successfully');
        this.getAdvisory();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.succeessMsgDialog(err.message);
      }
    })
  }

  openAddAdvisoryModal(){
    const dialogRef = this.dialog.open(AddOrEditAdvisoryComponent,{
      width:'auto',
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getAdvisory();
    });
  }

  openEditAdvisoryModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditAdvisoryComponent,{
      width:'auto',
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getAdvisory();
    });
  }

  openDeleteAdvisoryConfirm(id:any){
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.deleteDialog,{
      width:'auto',
    })
  }

  

  closeModal(){
    this.dialogRef.close();
  }

  

  succeessMsgDialog(msg:any){
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
