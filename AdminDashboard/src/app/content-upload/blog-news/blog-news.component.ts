import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AddOrEditBlogNewsComponent } from './add-or-edit-blog-news/add-or-edit-blog-news.component';

@Component({
  selector: 'app-blog-news',
  templateUrl: './blog-news.component.html',
  styleUrls: ['./blog-news.component.css']
})
export class BlogNewsComponent implements OnInit{
  blogNewsDataSource: any;
  success:boolean = false;
  err:boolean = false;
  dialogRef: any;

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteNavConfirm') deleteDialog = {} as TemplateRef<any>;

  public displayedColumns = [
    'id',
    'image',
    'content',
    'link',
    'edit/delete',
  ];
  deleteId: any;

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
  ){
    this.getBlogNewsdata();
  }

  ngOnInit(): void {
    
  }

  getBlogNewsdata(){
    this.appService.getBlogNews().subscribe({
      next:(res)=>{
        this.blogNewsDataSource = new MatTableDataSource(res);
        this.blogNewsDataSource.paginator = this.paginator;
        this.blogNewsDataSource.sort = this.sort;
      },
      error:(err)=>{

      }
    })
  }

  deleteBlogNewsItem(){
    this.appService.deleteBlogNews(this.deleteId).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.succeessmsgDialog('Deleted Successfully');
        this.getBlogNewsdata();
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.succeessmsgDialog(err.message);
      }
    })
  }

  openAddBlognewsModal(){
    const dialogRef = this.dialog.open(AddOrEditBlogNewsComponent,{
      exitAnimationDuration: '1000',
      enterAnimationDuration: '1000',
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getBlogNewsdata();
    })
  }

  openEditBlogNewsModal(data:any){
    const dialogRef = this.dialog.open(AddOrEditBlogNewsComponent,{
      exitAnimationDuration: '1000',
      enterAnimationDuration: '1000',
      data
    });
    dialogRef.afterClosed().subscribe((res)=>{
      this.getBlogNewsdata();
    })
  }

  openDeleteBlogNewsConfirm(Id:any){
    this.deleteId = Id;
    const dialogRef = this.dialog.open(this.deleteDialog,{
      width:'auto',
    })
  }

  closeModal(){
    this.dialog.closeAll();
  }

  succeessmsgDialog(msg:any){
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
