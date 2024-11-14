import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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

  nombre1: string;
  apellido1: string;

  private _mobileQueryListener: () => void;

  constructor(private _menuService: MenuService, private miServiUser: UserService,
              private route: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private toastr: ToastrService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.nombre1 = '';
    this.apellido1 = '';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.obtenerDatosUsuario();
  }
  
  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      console.log(data);
    })
  }

 onLogout() {
  const confirmLogout = window.confirm('¿Estás seguro de que deseas salir?');
  if (confirmLogout) {
    this.miServiUser.logout();
    this.isLoggedIn = false;
    this.toastr.success('Has cerrado sesión correctamente.', 'Sesión cerrada');
  } else {
    this.route.navigate(['dashboard']);
    this.toastr.info('Permaneces en tu sesión actual.', 'Sesión activa');
  }
}
  
  obtenerDatosUsuario() {
    const datosSesion = this.miServiUser.getDatosSesion();
    if (datosSesion) {
      const usuario: User = JSON.parse(datosSesion);
      if (usuario.nombre && usuario.apellidos) {
        this.nombre1 = usuario.nombre;
        this.apellido1 = usuario.apellidos;
      } else {
        console.error("Los datos del usuario no contienen nombre o apellidos.");
      }
    } else {
      this.ngOnInit();
      console.error("No hay datos de sesión disponibles.");
    }
  }
}
