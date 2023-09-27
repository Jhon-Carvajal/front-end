import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private _menuService: MenuService, private miServiUser : UserService, private route : Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

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




/*
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
*/
