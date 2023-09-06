import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  constructor(private _menuService: MenuService, private miServiUser : UserService, private route : Router){}

  ngOnInit(): void {
    
  }
  
  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      console.log(data);
    })
  }

  onLogout() {
    this.miServiUser.logout();
    this.isLoggedIn = false;
  }

}

