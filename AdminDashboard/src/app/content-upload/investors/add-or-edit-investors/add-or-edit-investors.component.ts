import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addInvestor, editInvestor } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-investors',
  templateUrl: './add-or-edit-investors.component.html',
  styleUrls: ['./add-or-edit-investors.component.css']
})
export class AddOrEditInvestorsComponent implements OnInit{
  addEditInvestorItemForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;
  url:any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb: FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditInvestorsComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditInvestorItemForm = this.fb.group({
      title : new FormControl('',[Validators.required]),
      link : new FormControl('',[Validators.required]),
      imageFile : '',
    })
  }

  ngOnInit(): void {
    this.addEditInvestorItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditInvestorItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditInvestorItem(){
    if(this.addEditInvestorItemForm.valid){
      if(this.datas){
        const editInvestorData : editInvestor = {
          id : this.datas.id,
          title : this.addEditInvestorItemForm.controls['title'].value,
          link : this.addEditInvestorItemForm.controls['link'].value,
          imageFile : this.addEditInvestorItemForm.controls['imageFile'].value
        }
        this.editInvestorForm(editInvestorData)
      }else{
        const addInvestorData : addInvestor = {
          title : this.addEditInvestorItemForm.controls['title'].value,
          link : this.addEditInvestorItemForm.controls['link'].value,
          imageFile : this.addEditInvestorItemForm.controls['imageFile'].value
        }
        this.addInvestorForm(addInvestorData)
      }
    }
  }
  addInvestorForm(data: any){
    const formData :any = new FormData;
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditInvestorItemForm.get('title').value);
    formData.append('link',this.addEditInvestorItemForm.get('link').value);

    this.appService.addInvestor(formData).subscribe({
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

  editInvestorForm(data: any){
    const formData: any  = new FormData();
    formData.append('id',data.id);
    formData.append('imageFile',this.file);
    formData.append('title',this.addEditInvestorItemForm.get('title').value);
    formData.append('link',this.addEditInvestorItemForm.get('link').value);

    this.appService.updateInvestor(formData).subscribe({
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
