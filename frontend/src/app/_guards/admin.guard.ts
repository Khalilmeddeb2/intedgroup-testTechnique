import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router :Router,private userService : UserService) { }

  canActivate() :boolean {
  
   if(this.userService.loggedIn() )
   {
     const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.role === 'Admin') {
      return true;
    }

    // Redirection si l'utilisateur n'est pas admin
    this.router.navigate(['/accueil']);
    return false;
  }
}

}
