import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditAboutusComponent } from './add-or-edit-aboutus/add-or-edit-aboutus.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit{
  aboutUsDataSource: any ;
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
    'edit/delete',
  ];
  deleteId: any;
  aboutData: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog
  ){
    this.getAboutUs();
    this.aboutUsDataSource = new MatTableDataSource(this.aboutData);
  }

  ngOnInit(): void {
    
  }
  getAboutUs(){
    this.appService.getAboutUs().subscribe({
      next:(res) => {
        this.aboutData = res;
        this.aboutUsDataSource = new MatTableDataSource(res);
        this.aboutUsDataSource.paginator = this.paginator;
        this.aboutUsDataSource.sort = this.sort;
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  deleteAboutItem(){
    this.appService.deleteAboutUs(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getAboutUs();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    });
    this.deleteId = 0;
  }
 public openAddAboutModal(){
    const dialogRef = this.dialog.open(AddOrEditAboutusComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getAboutUs();
      // this.appService.openSection('aboutUs')
    })
  }
 public openEditAboutModal(data:any){
    const dialogRef = this.dialog.open(AddOrEditAboutusComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data,
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getAboutUs();
      // this.appService.openSection('aboutUs')
    })
  }
 public  openDeleteAboutConfirm(id:any){
    this.deleteId = id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto',
    })
  }
  public closeModal() {
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
