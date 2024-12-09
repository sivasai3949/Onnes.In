import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addAdvisory, editAdvisory } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-advisory',
  templateUrl: './add-or-edit-advisory.component.html',
  styleUrls: ['./add-or-edit-advisory.component.css']
})
export class AddOrEditAdvisoryComponent implements OnInit{  
  addEditAdvisoryItemForm : any = FormGroup;
  success : boolean = false;
  err : boolean = false;
  url : any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,
    public dialogRef : MatDialogRef<AddOrEditAdvisoryComponent>,
    @Inject(MAT_DIALOG_DATA) public datas : any,
  ){
    this.addEditAdvisoryItemForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      imageFile : '',
      designation: new FormControl('',[Validators.required]),
      about: new FormControl('',[Validators.required]),
      link : new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.addEditAdvisoryItemForm.patchValue(this.datas);
  }
  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditAdvisoryItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditAdvisoryItem(){
    if(this.addEditAdvisoryItemForm.valid){
      if(this.datas){
        const editAdvisoryData : editAdvisory = {
          id : this.datas.id,
          name : this.addEditAdvisoryItemForm.controls['name'].value,
          imageFile : this.addEditAdvisoryItemForm.controls['imageFile'].value,
          designation : this.addEditAdvisoryItemForm.controls['designation'].value,
          about : this.addEditAdvisoryItemForm.controls['about'].value,
          link : this.addEditAdvisoryItemForm.controls['link'].value,
        }
        this.editAdvisoryForm(editAdvisoryData);
      }else{
        const addAdvisorydata : addAdvisory = {
          name : this.addEditAdvisoryItemForm.controls['name'].value,
          imageFile : this.addEditAdvisoryItemForm.controls['imageFile'].value,
          designation : this.addEditAdvisoryItemForm.controls['designation'].value,
          about : this.addEditAdvisoryItemForm.controls['about'].value,
          link : this.addEditAdvisoryItemForm.controls['link'].value,
        }
        this.addAdvisoryForm(addAdvisorydata);
      }
    }
  }

  addAdvisoryForm(data: any){
    const formData: any = new FormData;
    formData.append('name',this.addEditAdvisoryItemForm.get('name').value);
    formData.append('imageFile',this.file);
    formData.append('designation',this.addEditAdvisoryItemForm.get('designation').value);
    formData.append('about',this.addEditAdvisoryItemForm.get('about').value);
    formData.append('link',this.addEditAdvisoryItemForm.get('link').value);


    this.appService.addAdvisory(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added Successfully');
        this.appService.openSection('advisory');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editAdvisoryForm(data: any){
    const formData: any = new FormData;
    formData.append('id',data.id);
    formData.append('name',this.addEditAdvisoryItemForm.get('name').value);
    formData.append('imageFile',this.file);
    formData.append('designation',this.addEditAdvisoryItemForm.get('designation').value);
    formData.append('about',this.addEditAdvisoryItemForm.get('about').value);
    formData.append('link',this.addEditAdvisoryItemForm.get('link').value);

    this.appService.updateAdvisory(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Updated Successfully');
        this.appService.openSection('advisory');
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
