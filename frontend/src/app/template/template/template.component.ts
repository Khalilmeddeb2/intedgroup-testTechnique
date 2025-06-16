import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  navbarclass:any = "collapse navbar-collapse";
  roleUserCurent :String 
  constructor(private userService :UserService) { }

  ngOnInit(): void {
    const userInLocalStorage = localStorage.getItem('user');
    const user = JSON.parse(userInLocalStorage);
    this.roleUserCurent = user.role;
  }
  
logout() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    this.userService.clearSession();
    return;
  }
  
  this.userService.logout().subscribe({
    next: () => {
    this.userService.clearSession();
    },
    error: (err) => {
      console.error('Erreur lors du logout', err);
    this.userService.clearSession();
    }
  });
}

}
