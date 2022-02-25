import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() go_to_dash = new EventEmitter<any>(); 
  constructor(private service: ConnectService) { }

  existingUsers: any;
  submitted = false;
  loginSubmitted = false;

  ngOnInit(): void {
    this.getExistingUser();
  }

  public getExistingUser() {
    this.service.getUsers().subscribe(result => {
      this.existingUsers = result;
    })
  }

  userLoginForm = new FormGroup({
    'loginMail': new FormControl('', [Validators.required, Validators.email]),
    'loginPass': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
  })

  userSignUpForm = new FormGroup({
    'fullName': new FormControl('', [Validators.required]),
    'signUpMail': new FormControl('', [Validators.required, Validators.email]),
    'signUpPass': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
  })

  get f() {
    return this.userSignUpForm.controls;
  }

  get f2() {
    return this.userLoginForm.controls;
  }

  userLoginSubmit() {
    this.loginSubmitted = true;
    if (this.userLoginForm.valid) {
      if (this.existingUsers.some((item: any) => item.email === this.userLoginForm.value.loginMail)) {
        this.go_to_dash.emit();  
      }
      else {
        alert("User does not exists!");
      }
    }
  }

  userSignUpSubmit() {
    this.submitted = true;
    if (this.userSignUpForm.valid) {
      if (this.existingUsers.some((item: any) => item.email === this.userSignUpForm.value.signUpMail)) {
        alert("User already exists!");
      }
      else {
        this.service.createUsers(this.userSignUpForm.value).subscribe(result => {
          if (result == 'success') {
            alert("User created successfully!");
            this.reset();
            this.getExistingUser();
          }
          else {
            alert("Something went wrong!");
          }
        })
      }
    }
  }

  reset(): void {
    this.submitted = false;
    this.loginSubmitted = false;
    this.userLoginForm.reset();
    this.userSignUpForm.reset();
  }
}
