import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { addNavItem, editNavItem } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-nav-item',
  templateUrl: './add-or-edit-nav-item.component.html',
  styleUrls: ['./add-or-edit-nav-item.component.css']
})
export class AddOrEditNavItemComponent implements OnInit{

  public addEditNavItemForm:any =  FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService : AppService,
    public fb : FormBuilder,
    public dialog : MatDialog,
    private dialogRef : MatDialogRef<AddOrEditNavItemComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditNavItemForm = this.fb.group({
      navbarName: new FormControl('',[Validators.required]),
      navbarSubName: '',
      routerLink: '',
    });
  }

  ngOnInit(): void {
    this.addEditNavItemForm.patchValue(this.datas);
  }

   addeditNavItem(){
    if(this.addEditNavItemForm.valid){
      if(this.datas){
        const editNavItemData : editNavItem = {
          id: this.datas.id,
          navbarName: this.addEditNavItemForm.controls['navbarName'].value,
          navbarSubName: this.addEditNavItemForm.controls['navbarSubName'].value,
          routerLink : this.addEditNavItemForm.controls['routerLink'].value,
        }
        this.editNavItemForm(editNavItemData);
      }else{
        const addNavItemData : addNavItem = {
          navbarName: this.addEditNavItemForm.controls['navbarName'].value,
          navbarSubName: this.addEditNavItemForm.controls['navbarSubName'].value,
          routerLink : this.addEditNavItemForm.controls['routerLink'].value,
        }
        this.addNavItemForm(addNavItemData);
      }
    }
  }

   addNavItemForm(navitem : addNavItem){
    this.appService.addnavItem(navitem).subscribe({
      next:(res)=>{
        this.dialogRef.close(true);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Nav Item Added Successfully ');
      },
      error:(err)=>{
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public editNavItemForm(navitem : editNavItem){
    this.appService.updateNavItem(navitem).subscribe({
      next:(res)=>{
        this.dialogRef.close();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Nav Item Updated Successfully ');
      },
      error:(err)=>{
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public closeModal(){
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
        this.appService.openSection('navItem');
      }, timeout);
    });
  }
}
