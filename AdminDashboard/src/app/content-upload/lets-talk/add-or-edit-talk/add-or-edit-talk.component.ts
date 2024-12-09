import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addLetsTalk, editLetsTalk } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-talk',
  templateUrl: './add-or-edit-talk.component.html',
  styleUrls: ['./add-or-edit-talk.component.css']
})
export class AddOrEditTalkComponent implements OnInit{
  addEditTalkForm: any = FormGroup;
  success: boolean = false;
  err: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService :AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,

    private dialogref : MatDialogRef<AddOrEditTalkComponent>,
    @Inject(MAT_DIALOG_DATA) public datas:any,
  ){

    this.addEditTalkForm = this.fb.group({
      name : new FormControl('',[Validators.required]),
      adress : new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.addEditTalkForm.patchValue(this.datas);
  }

  addeditTalk(){
    if(this.addEditTalkForm.valid){
      if(this.datas){
        const editTalkData : editLetsTalk = {
          id : this.datas.id,
          name : this.addEditTalkForm.controls['name'].value,
          adress : this.addEditTalkForm.controls['adress'].value
        }
        this.editTalkForm(editTalkData);
      }else{
        const addTalkData : addLetsTalk = {
          name : this.addEditTalkForm.controls['name'].value,
          adress : this.addEditTalkForm.controls['adress'].value
        }
        this.addTalkForm(addTalkData);
      }
    }
  }
  addTalkForm(data: any){
    this.appService.addLetsTalk(data).subscribe({
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

  editTalkForm(data: any){
    this.appService.updateLetsTalk(data).subscribe({
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
