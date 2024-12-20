import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { AuthStatus } from '../interfaces/authenticacion';
import { __param } from 'tslib';
import { mergeMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // VARIABLES PRIVADAS
  private _currentUser = signal<User|null>(null);
  public _authStatus = signal<AuthStatus>( AuthStatus.checking );

  // VARIABLES PUBLICAS
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  elUsuario = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient, private router: Router) {
    this.verificarSesionActual();
  }
/* obtencion de la info del ususrio la cual se usara para la informacion del token */

  public get usuarioSesionActiva(): User {
    return this.elUsuario.value;
  }

  setUsuario(user: User) {
    this.elUsuario.next(user);
  }

  getUsuario() {
    return this.elUsuario.asObservable();
  }

  login(infoUsuario: User): Observable<User> {
    return this.http.post<User>(`${environment.url_gateway}/login`, infoUsuario)
  }
 
  register(infoUsuario: User): Observable<User> {
    return this.http.post<User>(`${environment.url_usuarios}/usuarios`, infoUsuario)
      .pipe(
        mergeMap((registeredUser: User): Observable<User> => {
            return this.asignar(registeredUser._id!);  
        }));
  }

  asignar(userid: String): Observable<User> {
    return this.http.put<User>(`${environment.url_usuarios}/usuarios/${userid}/rol/64de703681d31d2218482503`,{});
  }
  
  guardarDatosSesion(datosSesion: any) {
    let data: User = {
      _id: datosSesion.user_id,
      nombre: datosSesion.nombre,
      apellidos: datosSesion.apellidos,
      correo: datosSesion.correo,
      token: datosSesion.token,
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUsuario(data);
    return localStorage.getItem('sesion');
  }

  logout() {
    localStorage.removeItem('sesion');
    this.setUsuario(new User());
  }

  verificarSesionActual() {
    let sesionActual = this.getDatosSesion();
    if (sesionActual) {
      this.setUsuario(JSON.parse(sesionActual));
    }
  }

  sesionExiste(): boolean {
    let sesionActual = this.getDatosSesion();
    return (sesionActual) ? true : false;
  }

  getDatosSesion() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }

}