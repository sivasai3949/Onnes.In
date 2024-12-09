import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactForm: any;
  submitted: boolean = false;
  display: any;
  letsTalkData: any[] = [];

  constructor(
     public fb:FormBuilder,
     public ds:FormService,
     ){}

  ngOnInit():void{
    this.contactForm = this.fb.group({
      name : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
      comment : new FormControl('',[Validators.required]),
    });
    this.getLetsTalk();
  }
get g(){
  return this.contactForm.controls;
}
  onSubmit(){
    this.submitted = true;
    if(this.contactForm.invalid){
      return;
    }
    this.ds.addMessageForm(this.contactForm.value).subscribe((res:any)=>{
      console.log(res);
      this.openModal();
    });
    setTimeout(() => {
      this.onCloseHandled();
      this.submitted = false;
      this.contactForm.reset();
    }, 6000);
  }

  // Model Open Funcation
  openModal() {
    this.display = 'block';
  }

  // Model close Funcation
  onCloseHandled() {
    this.display = 'none'
  }

  getLetsTalk(){
    this.ds.getLetsTalk().subscribe((res:any)=>{
      this.letsTalkData = res;
    })
  }

}
