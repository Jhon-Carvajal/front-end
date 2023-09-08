import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor( private miServiUser : UserService, private route : Router){}

  ngOnInit(): void {
    
  }
  
  

  onLogout() {
    this.miServiUser.logout();
    this.isLoggedIn = false;
  }

}

