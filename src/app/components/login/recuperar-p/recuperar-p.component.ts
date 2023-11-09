import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AuthStatus } from 'src/app/interfaces/authenticacion';

@Component({
  selector: 'app-recuperar-p',
  templateUrl: './recuperar-p.component.html',
  styleUrls: ['./recuperar-p.component.css']
})
export class RecuperarPComponent implements OnInit{
  
  correo1:string="";
  contrasena1:string="";

  form1: FormGroup;

  loading1 = false;
  hide1=true;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private router: Router, private miServicioUser: UserService){
    this.form1 = this.fb.group({
      correo1: ['',Validators.required],
      contrasena1: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    
  }
  login():void{

    //console.log("correo "+this.correo+" contraseña "+this.contrasena)
    let elUsuario:User={
      correo:this.correo1,
      contrasena:this.contrasena1
    }
    this.miServicioUser.login(elUsuario).subscribe(data =>{
      this.Loading1();
      this.miServicioUser.guardarDatosSesion(data);
      this.miServicioUser._authStatus.set( AuthStatus.authenticated );
    },err => {
      this.form1.reset();
    }
   )
  }
  
  error1() {
    this._snackBar.open('Usuario o Contraseña Incorrecta', 'Intenta de nuevo', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  Loading1 (){
    this.loading1 = true
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
