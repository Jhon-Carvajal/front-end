import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  nombre2: string;
  apellido2: string;
  correo2: string;
 
  constructor(
    private userservice1: UserService) { 
     this.nombre2 = '';
     this.apellido2 = '';
     this.correo2 = '';
  }
  
 ngOnInit(): void {
    this.obtenerDatosUsuario1();
 }
  
  obtenerDatosUsuario1() {
    const datossesion = this.userservice1.getDatosSesion();
    
    if (datossesion) {
        const usuario: User = JSON.parse(datossesion);
        
        if (usuario.nombre && usuario.apellidos && usuario.correo) {
            this.nombre2 = usuario.nombre;
            this.apellido2 = usuario.apellidos;
            this.correo2 = usuario.correo;
            //console.log("Nombre:", this.correo2);
        } else {
            console.error("correo no disponicle");
        }
    } else {
        console.error("No hay datos de sesión disponibles.");
    }
  }
  
}

