import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../_Interface/Employee';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public router: Router,
    public loginService: LoginService
  ) { }

  public login(loginForm: NgForm){
    console.log("loginForm", loginForm.value);
    this.loginService.authenticate(loginForm.value).subscribe({
      next: (response: any) => {
        if(response === true){
          this.router.navigate(['/home']);
        }else{
          alert("Invalid Employee Credentials!!!");
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    
  }

}