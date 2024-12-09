import { Component, Inject, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addTeam, editTeam } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-team',
  templateUrl: './add-or-edit-team.component.html',
  styleUrls: ['./add-or-edit-team.component.css']
})
export class AddOrEditTeamComponent implements OnInit{
  addEditTeamItemForm: any = FormGroup;
  success : boolean = false;
  err : boolean = false;
  url : any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,
    public dialogRef : MatDialogRef<AddOrEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public datas : any,
  ){
    this.addEditTeamItemForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      imageFile : '',
      designation: new FormControl('',[Validators.required]),
      about: new FormControl('',[Validators.required]),
      link1 : '',
      link2 : '',
      link3 : '',
      link4 : '',
    })
  }
  ngOnInit(): void {
    this.addEditTeamItemForm.patchValue(this.datas);
  }

  file:any;
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.addEditTeamItemForm.patchValue({
      questionImages : this.file ,
    });
  }

  addeditTeamItem(){
    if(this.addEditTeamItemForm.valid){
      if(this.datas){
        const editTeamData : editTeam = {
          id : this.datas.id,
          name : this.addEditTeamItemForm.controls['name'].value,
          imageFile : this.addEditTeamItemForm.controls['imageFile'].value,
          designation : this.addEditTeamItemForm.controls['designation'].value,
          about : this.addEditTeamItemForm.controls['about'].value,
          link1 : this.addEditTeamItemForm.controls['link1'].value,
          link2 : this.addEditTeamItemForm.controls['link2'].value,
          link3 : this.addEditTeamItemForm.controls['link3'].value,
          link4 : this.addEditTeamItemForm.controls['link4'].value
        }
        this.editTeamForm(editTeamData);
      }else{
        const addTeamdata : addTeam = {
          name : this.addEditTeamItemForm.controls['name'].value,
          imageFile : this.addEditTeamItemForm.controls['imageFile'].value,
          designation : this.addEditTeamItemForm.controls['designation'].value,
          about : this.addEditTeamItemForm.controls['about'].value,
          link1 : this.addEditTeamItemForm.controls['link1'].value,
          link2 : this.addEditTeamItemForm.controls['link2'].value,
          link3 : this.addEditTeamItemForm.controls['link3'].value,
          link4 : this.addEditTeamItemForm.controls['link4'].value
        }
        this.addteamForm(addTeamdata);
      }
    }
  }

  addteamForm(data:any){
    const formData: any = new FormData;
    formData.append('name',this.addEditTeamItemForm.get('name').value);
    formData.append('imageFile',this.file);
    formData.append('designation',this.addEditTeamItemForm.get('designation').value);
    formData.append('about',this.addEditTeamItemForm.get('about').value);
    formData.append('link1',this.addEditTeamItemForm.get('link1').value);
    formData.append('link2',this.addEditTeamItemForm.get('link2').value);
    formData.append('link3',this.addEditTeamItemForm.get('link3').value);
    formData.append('link4',this.addEditTeamItemForm.get('link4').value);


    this.appService.addTeam(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Added Successfully');
        this.appService.openSection('team');
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }

  editTeamForm(data:any){
    const formData: any = new FormData;
    formData.append('id',data.id);
    formData.append('name',this.addEditTeamItemForm.get('name').value);
    formData.append('imageFile',this.file);
    formData.append('designation',this.addEditTeamItemForm.get('designation').value);
    formData.append('about',this.addEditTeamItemForm.get('about').value);
    formData.append('link1',this.addEditTeamItemForm.get('link1').value);
    formData.append('link2',this.addEditTeamItemForm.get('link2').value);
    formData.append('link3',this.addEditTeamItemForm.get('link3').value);
    formData.append('link4',this.addEditTeamItemForm.get('link4').value);

    this.appService.updateTeam(formData).subscribe({
      next:(res)=>{
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Updated Successfully');
        this.appService.openSection('team');
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
