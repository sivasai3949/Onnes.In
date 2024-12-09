import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addOffering, editOffering } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-offering',
  templateUrl: './add-or-edit-offering.component.html',
  styleUrls: ['./add-or-edit-offering.component.css']
})
export class AddOrEditOfferingComponent implements OnInit{
  addEditOfferingItemForm: any = FormGroup;
  success : boolean = false;
  err : boolean = false;
  url : any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,

    private dialogRef : MatDialogRef<AddOrEditOfferingComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditOfferingItemForm = this.fb.group({
      title : new FormControl('',[Validators.required]),
      imageFile : '',
      content : new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.addEditOfferingItemForm.patchValue(this.datas)
  }

  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditOfferingItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditOfferingItem(){
    if(this.addEditOfferingItemForm.valid){
      if(this.datas){
        const editOfferingData : editOffering = {
          id: this.datas.id,
          title : this.addEditOfferingItemForm.controls['title'].value,
          imageFile : this.addEditOfferingItemForm.controls['imageFile'].value,
          content : this.addEditOfferingItemForm.controls['content'].value,
        }
        this.editOfferingform(editOfferingData);
      }else{
        const addOfferingData : addOffering = {
          title : this.addEditOfferingItemForm.controls['title'].value,
          imageFile : this.addEditOfferingItemForm.controls['imageFile'].value,
          content : this.addEditOfferingItemForm.controls['content'].value,
        }
        this.addOfferingForm(addOfferingData)
      }
    }
  }

  addOfferingForm(data:any){
    const formData : any = new FormData();
    formData.append('title',this.addEditOfferingItemForm.get('title').value);
    formData.append('imageFile' , this.file);
    formData.append('content',this.addEditOfferingItemForm.get('content').value);

    this.appService.addOfferingData(formData).subscribe({
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

  editOfferingform(data:any){
    const formData : any = new FormData();
    formData.append('id',data.id);
    formData.append('title',this.addEditOfferingItemForm.get('title').value);
    formData.append('imageFile' , this.file);
    formData.append('content',this.addEditOfferingItemForm.get('content').value);

    this.appService.updateOffering(formData).subscribe({
      next:(res)=>{
       this.closeModal();
       this.success = true;
       this.err = false;
        this.successMsgDialog('Item Updated Successfylly');
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

  successMsgDialog(msg: string) {
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
