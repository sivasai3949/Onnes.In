import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addHomeImage, editHomeImage } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-home-image',
  templateUrl: './add-or-edit-home-image.component.html',
  styleUrls: ['./add-or-edit-home-image.component.css']
})
export class AddOrEditHomeImageComponent implements OnInit{
  addEditHomeImageItemForm : any = FormGroup;
  success : boolean = false;
  err : boolean = false;
  url : any;
  selected : any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditHomeImageComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditHomeImageItemForm = this.fb.group({
      imageFile : '',
      text : '',
      order : '',
      colour : '',
    })
  }
  ngOnInit( ): void {
    this.addEditHomeImageItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditHomeImageItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditHomeImageItem(){
    if(this.addEditHomeImageItemForm.valid){
      if(this.datas){
        const editHomeImageData : editHomeImage = {
          id : this.datas.id,
          imageFile : this.addEditHomeImageItemForm.controls['imageFile'].value,
          text : this.addEditHomeImageItemForm.controls['text'].value,
          order : this.addEditHomeImageItemForm.controls['order'].value,
          colour : this.addEditHomeImageItemForm.controls['colour'].value,
        }
        this.editHomeImageForm(editHomeImageData)
      }
      else{
        const addHomeImageData : addHomeImage = {
          imageFile : this.addEditHomeImageItemForm.controls['imageFile'].value,
          text : this.addEditHomeImageItemForm.controls['text'].value,
          order : this.addEditHomeImageItemForm.controls['order'].value,
          colour : this.addEditHomeImageItemForm.controls['colour'].value,
        }
        this.addHomeImageForm(addHomeImageData);
      }
    }
  }

  addHomeImageForm(data:any){
    const formData :any = new FormData;
    formData.append('imageFile', this.file);
    formData.append('text',this.addEditHomeImageItemForm.get('text').value);
    formData.append('colour',this.addEditHomeImageItemForm.get('colour').value);
    formData.append('order',this.addEditHomeImageItemForm.get('order').value);

    this.appService.addHomeImage(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog("Item Added Successfully");
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editHomeImageForm(data:any){
    const formData :any = new FormData;
    formData.append('id',data.id);
    formData.append('imageFile', this.file);
    formData.append('text',this.addEditHomeImageItemForm.get('text').value);
    formData.append('colour',this.addEditHomeImageItemForm.get('colour').value);
    formData.append('order',this.addEditHomeImageItemForm.get('order').value);

    this.appService.updateHomeImage(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog("Item Updated Successfully");
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
