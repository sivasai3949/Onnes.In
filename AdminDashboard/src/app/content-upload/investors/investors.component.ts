import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditInvestorsComponent } from './add-or-edit-investors/add-or-edit-investors.component';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent {
  investorDataSource: any = FormGroup;
  investorData: any;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;
  deleteId: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog ={} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') delteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'title',
    'image',
    'link',
    'edit/delete',
  ];

  constructor(
    public appService : AppService,
    public dialog : MatDialog
  ){
    this.getInvestor();
    this.investorDataSource = new MatTableDataSource(this.investorData);
  }

  getInvestor(){
    this.appService.getInvestor().subscribe({
      next:(res)=>{
        this.investorData = res;
        this.investorDataSource = new MatTableDataSource(this.investorData);
        this.investorDataSource.paginator = this.paginator;
        this.investorDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteInvestorItem(){
    this.appService.deleteInvestor(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Deleted Successfully');
        this.getInvestor();
    },
    error:(err)=>{
      this.success = false;
      this.err = true;
      this.successMsgDialog(err.message);
    }
  });
  this.deleteId = 0;
  }

  openAddInvestorModal(){
    const dialogRef = this.dialog.open(AddOrEditInvestorsComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getInvestor();
    })
  }

  openEditInvestorModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditInvestorsComponent,{
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data,
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getInvestor();
    })
  }

  openDeleteInvestorConfirm(id: number){
    this.deleteId = id;
    const dialogRef = this.dialog.open(this.delteDialog,{
      width:'auto',
    });
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
