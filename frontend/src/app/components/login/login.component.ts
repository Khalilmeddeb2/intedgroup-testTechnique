import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  eroorMessage :string;
  
  constructor(private formBuilder: FormBuilder,
    private router :Router,
    private userService :UserService,
    private tokenStorage :TokenStorageService
  
    ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
      }, {
      });
  }
  get f() { return this.loginForm.controls; }

 login() {
  this.eroorMessage = "";
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.userService.loginUser(this.loginForm.value).subscribe(
    (data) => {
      localStorage.setItem('token', data['accessToken']);
      localStorage.setItem('refreshToken', data['refreshToken']);
      const userData = {
        id: data['id'],
        firstName : data['firstName'],
        lastName : data['lastName'],
        role: data['role']
      };
      localStorage.setItem('user', JSON.stringify(userData));
      this.tokenStorage.saveUser(userData);
      this.router.navigate(['/accueil']);
    },
    (error) => {
      this.eroorMessage = "Merci de vérifier vos informations";
      return false;
    }
  );
}
  
  goToSingUp(){
    this.router.navigate(['inscription']);
  }
}
