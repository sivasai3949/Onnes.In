import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addBlogNews, editBlogNews } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-blog-news',
  templateUrl: './add-or-edit-blog-news.component.html',
  styleUrls: ['./add-or-edit-blog-news.component.css']
})
export class AddOrEditBlogNewsComponent implements OnInit{
  addEditblogNewsItemForm:any = FormGroup;
  success : boolean = false;
  err : boolean = false;
  url : any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>

  constructor(
    public appService : AppService,
    public dialog : MatDialog,
    public fb : FormBuilder,

    private dialogRef : MatDialogRef<AddOrEditBlogNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditblogNewsItemForm = this.fb.group({
      imageFile : '',
      content : new FormControl('',[Validators.required]),
      link : new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.addEditblogNewsItemForm.patchValue(this.datas);
  }

  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditblogNewsItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditBlogNewsItem(){
    if(this.addEditblogNewsItemForm.valid){
      if(this.datas){
        const editBlogData : editBlogNews = {
          id:this.datas.id,
          imageFile : this.addEditblogNewsItemForm.controls['imageFile'].value,
          content : this.addEditblogNewsItemForm.controls['content'].value,
          link : this.addEditblogNewsItemForm.controls['link'].value,
        }
        this.editBlogNews(editBlogData);
      }else{
        const addBlogData : addBlogNews = {
          imageFile : this.addEditblogNewsItemForm.controls['imageFile'].value,
          content : this.addEditblogNewsItemForm.controls['content'].value,
          link : this.addEditblogNewsItemForm.controls['link'].value,
        }
        this.addBlogsNewsFun(addBlogData);
      }
    }
  }

  addBlogsNewsFun(data:any){
    const formData: any  = new FormData();
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditblogNewsItemForm.get('content').value);
    formData.append('link',this.addEditblogNewsItemForm.get('link').value);

    this.appService.addBlogNewsData(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added Successfully');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editBlogNews(data:any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditblogNewsItemForm.get('content').value);
    formData.append('link',this.addEditblogNewsItemForm.get('link').value);

    this.appService.updateBlogNews(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added Successfully');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  successMsgDialog(msg:any){
    this.appService.httpClientMsg = msg;
    const timeout = 750;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
