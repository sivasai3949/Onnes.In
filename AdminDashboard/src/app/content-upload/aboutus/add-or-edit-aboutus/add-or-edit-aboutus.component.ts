import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addAboutUs, editAboutUs } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-aboutus',
  templateUrl: './add-or-edit-aboutus.component.html',
  styleUrls: ['./add-or-edit-aboutus.component.css']
})
export class AddOrEditAboutusComponent implements OnInit {
  addEditAboutItemForm:any =  FormGroup;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditAboutusComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) {
    this.addEditAboutItemForm = this.fb.group({
      imageFile : '',
      content : new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.addEditAboutItemForm.patchValue(this.datas);
  }

  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditAboutItemForm.patchValue({
      questionImages : this.file ,
    });
  }
  addeditAboutItem(){
    if(this.addEditAboutItemForm.valid){
      if(this.datas){
        const editAboutUsData : editAboutUs = {
          id : this.datas.id,
          imageFile : this.addEditAboutItemForm.controls['imageFile'].value,
          content : this.addEditAboutItemForm.controls['content'].value,
        }
        this.editAboutItemForm(editAboutUsData);
      }else{
        const addAboutUsData : addAboutUs = {
          imageFile : this.addEditAboutItemForm.controls['imageFile'].value,
          content : this.addEditAboutItemForm.controls['content'].value,
        }
        this.addAboutItemForm(addAboutUsData);
      }
    }
  }

  addAboutItemForm(data:any){
    const formData: any  = new FormData();
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditAboutItemForm.get('content').value);

    this.appService.addAboutUs(formData).subscribe({
      next:(res)=>{
       this.closeModal();
       this.success = true;
       this.err = false;
        this.successMsgDialog('Item Added Successfylly');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editAboutItemForm(data:any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('content',this.addEditAboutItemForm.get('content').value);

    this.appService.updateAboutUs(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Updated Successfully');
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

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 750;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        // this.appService.openSection('navItem');
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
