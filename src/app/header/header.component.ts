import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public router: Router
  ){}

  logout(){
    console.log("logout() called", this.router.url);
    this.router.navigate(['/login']);
  }
}
