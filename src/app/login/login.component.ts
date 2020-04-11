import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor( 
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router
   ) 
   {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
  }

   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit() : void {
    this.submitted = true;

    console.log('checkkkk')
   
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
            .subscribe(
              data => {
                console.log(data);
                 this.router.navigate(['/home']);
            },
            error => {
               this.loading = false;
            });
    
  } 
  

}
