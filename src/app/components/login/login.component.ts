import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AuthStatus } from 'src/app/interfaces/authenticacion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo:string="";
  contrasena:string="";

  form: FormGroup;

  loading = false;
  hide=true;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private miServicioUser: UserService,
    private toastr: ToastrService) {
    
    this.form = this.fb.group({
      correo: ['',Validators.required],
      contrasena: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    
  }
  login():void{

    //console.log("correo "+this.correo+" contraseña "+this.contrasena)
    let elUsuario: User = {
      correo:this.correo,
      contrasena:this.contrasena
    }
    this.miServicioUser.login(elUsuario).subscribe(data =>{
      this.Loading();
      this.miServicioUser.guardarDatosSesion(data);
      this.miServicioUser._authStatus.set(AuthStatus.authenticated);
    }, err => {
      this.error()
      this.form.reset();
    }
   )
  }
  
  error() {
    this.toastr.error('Intenta de nuevo', 'Usuario o Contraseña Incorrecta')
    this.router.navigate(['login']);
  }

  Loading (){
    this.loading = true
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }

}