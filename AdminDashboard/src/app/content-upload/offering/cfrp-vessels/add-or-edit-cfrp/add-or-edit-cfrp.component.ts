import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addCfrp, editCfrp } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-cfrp',
  templateUrl: './add-or-edit-cfrp.component.html',
  styleUrls: ['./add-or-edit-cfrp.component.css']
})
export class AddOrEditCfrpComponent implements OnInit{
  addEditCfrpForm: any = FormGroup;
  success : boolean = false;
  err :  boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,

    private dialogref : MatDialogRef<AddOrEditCfrpComponent>,
    @Inject(MAT_DIALOG_DATA) public datas:any,
  ){
    this.addEditCfrpForm = this.fb.group({
      name : new FormControl('',[Validators.required]),
      content : new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.addEditCfrpForm.patchValue(this.datas);
  }

  addeditCfrp(){
    if(this.addEditCfrpForm.valid){
      if(this.datas){
        const editCfrpData : editCfrp = {
          id : this.datas.id,
          name : this.addEditCfrpForm.controls['name'].value,
          content : this.addEditCfrpForm.controls['content'].value
        }
        this.editCfrpForm(editCfrpData);
      }else{
        const addCfrpData : addCfrp = {
          name : this.addEditCfrpForm.controls['name'].value,
          content : this.addEditCfrpForm.controls['content'].value
        }
        this.addCfrpForm(addCfrpData);
      }
    }
  }
  addCfrpForm(addData : addCfrp){
    this.appService.addCfrp(addData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added SuccessFully');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }
  editCfrpForm(editData : editCfrp){
    this.appService.updateCfrp(editData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added SuccessFully');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  closeModal(){
    this.dialogref.close();
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
      }, timeout);
    });
  }
}
