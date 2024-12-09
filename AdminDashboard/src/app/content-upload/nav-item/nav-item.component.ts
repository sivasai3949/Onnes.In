import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddOrEditNavItemComponent } from './add-or-edit-nav-item/add-or-edit-nav-item.component';
import { AppService } from 'src/app/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit{
  public navItemDataSource : any  ;
  public success: boolean = false;
  public err: boolean = false;
  dialogRef: any;
  deleteId : any;


  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;
  
  public displayedColumns = [
    'id',
    'navbarName',
    'subNavbar',
    'routerlink',
    'edit/delete',
  ];
  allNavList: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog
  ){
    this.getNavItemDetails();
    this.navItemDataSource = new MatTableDataSource(this.allNavList);
  }
  ngOnInit(): void {
    
  }

   getNavItemDetails(){
    this.appService.getNavItem().subscribe({
      next:(res:any) => {
        this.allNavList = res;
        this.navItemDataSource = new MatTableDataSource(res);
        this.navItemDataSource.paginator = this.paginator;
        this.navItemDataSource.sort = this.sort;
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  deleteNavItem(){
    this.appService.deleteNavItem(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getNavItemDetails();
      },
      error:(err)=>{
        this.success = false;
        this.err =  true;
        this.successMsgDialog(err.message);
      }
    })
    this.deleteId = 0;
  }

  public openAddNavModal(){
    const dialogRef = this.dialog.open(AddOrEditNavItemComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getNavItemDetails();
      
    });
  }

  public openEditNavModal(data:any){
    const dialogRef = this.dialog.open(AddOrEditNavItemComponent,{
      width:'auto',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data,
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getNavItemDetails();
    })
  }

  public openDeleteNavConfirm(id:any){
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.delteDialog, {
      width:'auto'
    });
  }
  public closeModal() {
    this.dialogRef.close();
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
