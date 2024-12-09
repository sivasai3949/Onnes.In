import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditTeamComponent } from './add-or-edit-team/add-or-edit-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{

  teamItemDataSource:any;
  success : boolean = false;
  err : boolean = false;
  dialogRef : any;

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
    'link2',
    'link3',
    'link4',
    'edit/delete',
  ];
  allTeamList: any;
  deleteId: any;

  constructor(
    public appService : AppService,
    private dialog : MatDialog,
  ){
    this.getTeamData();
    this.teamItemDataSource = new MatTableDataSource(this.allTeamList);
  }

  ngOnInit(): void {
    
  }

  getTeamData(){
    this.appService.getTeam().subscribe({
      next:(res)=>{
        this.allTeamList = res;
        this.teamItemDataSource = new MatTableDataSource(res);
        this.teamItemDataSource.paginator = this.paginator;
        this.teamItemDataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  deleteTeamItem(){
    this.appService.deleteTeam(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.succeessMsgDialog('Deleted Successfully');
        this.getTeamData();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.succeessMsgDialog(err.message);
      }
    })
  }

  openAddTeamModal(){
    const dialogRef = this.dialog.open(AddOrEditTeamComponent,{
      width:'auto',
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getTeamData();
    })
  }

  openEditTeamModal(data:any){
    const dialogRef = this.dialog.open(AddOrEditTeamComponent,{
      width:'auto',
      exitAnimationDuration:'1000',
      enterAnimationDuration:'1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getTeamData();
    })
  }

  openDeleteTeamConfirm(id:any){
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
