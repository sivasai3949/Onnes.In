import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  
  public hide: boolean = true;
  loginForm: any = FormGroup;
  invalid: boolean = false;
  authenticating: boolean = false;

  constructor( 
    public fb : FormBuilder,
    public ds : AppService,
    private router : Router,
    private snackBar : MatSnackBar
  ){}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        userName : [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          ]),
        ],
        password: [
          '',
          Validators.compose([Validators.minLength(6), Validators.required]),
        ],
      });
    }

    onLogin(){
      this.ds.loginDetails(this.loginForm.value).subscribe({
        next:(res) => {
          this.snackBar.open('Login Successfully','',{
            duration: 2000,
            verticalPosition: "top", // Allowed values are  'top' | 'bottom'
            horizontalPosition: "center" ,// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
            panelClass: "sucess-message"
          });
         localStorage.setItem('currentuser', JSON.stringify(res));
          // this.router.navigateByUrl('/dashboard', {skipLocationChange: true});
          this.router.navigateByUrl('/dashboard');
        },
        error:(error) => {
          this.snackBar.open('Invalid Credentials','',{
            duration: 2000,
            verticalPosition: "top", // Allowed values are  'top' | 'bottom'
            horizontalPosition: "center" ,// Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
            panelClass: "error-message"
          });
        }
      })
    }
}
