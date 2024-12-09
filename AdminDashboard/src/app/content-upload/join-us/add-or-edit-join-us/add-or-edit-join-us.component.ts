import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addJoinUs, editJoinUs } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-join-us',
  templateUrl: './add-or-edit-join-us.component.html',
  styleUrls: ['./add-or-edit-join-us.component.css']
})
export class AddOrEditJoinUsComponent implements OnInit{
  addEditJoinUsForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService :AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,

    private dialogref : MatDialogRef<AddOrEditJoinUsComponent>,
    @Inject(MAT_DIALOG_DATA) public datas:any,
  ){

    this.addEditJoinUsForm = this.fb.group({
      content : new FormControl('',[Validators.required]),
      mail : ''
    })
  }

  ngOnInit(): void {
    this.addEditJoinUsForm.patchValue(this.datas);
  }

  addeditJionUs(){
    if(this.addEditJoinUsForm.valid){
      if(this.datas){
        const editJoinData : editJoinUs = {
          id : this.datas.id,
          content : this.addEditJoinUsForm.controls['content'].value,
          mail : this.addEditJoinUsForm.controls['mail'].value
        }
        this.editJoinUsForm(editJoinData);
      }else{
        const addJoinUsData : addJoinUs = {
          content : this.addEditJoinUsForm.controls['content'].value,
          mail : this.addEditJoinUsForm.controls['mail'].value
        }
        this.addJoinUsForm(addJoinUsData);
      }
    }
  }

  addJoinUsForm(addJoin : addJoinUs){
    this.appService.addJoinUs(addJoin).subscribe({
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

  editJoinUsForm(editjoin: editJoinUs){
    this.appService.updateJoinUs(editjoin).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Updated SuccessFully');
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
