import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Subscription, timeout } from 'rxjs';
import { Response } from '../../interfaces/response';
//import Swal from 'sweetalert2';
import { AuthStatus } from 'src/app/interfaces/authenticacion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  /*loginData = {
    correo:'',
    contrasena:''
  }*/
  correo:string="";
  contrasena:string="";

  form: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private router: Router, private miServicioUser: UserService){
    this.form = this.fb.group({
      correo: ['',Validators.required],
      contrasena: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    
  }
  login():void{

    console.log("aqui "+this.correo+" contraseña "+this.contrasena)
    let elUsuario:User={
      correo:this.correo,
      contrasena:this.contrasena
    }
    this.miServicioUser.login(elUsuario).subscribe(data =>{
      this.Loading();
      this.miServicioUser.guardarDatosSesion(data);
      this.miServicioUser._authStatus.set( AuthStatus.authenticated );
    },err => {
      this.error();
      this.form.reset();
    }
    )
/**
    this.miServicioUser.login(this.loginData).subscribe((data:any) => {
      console.log(data);

      this.Loading();
      this.router.navigate(['dashboard'])
    },err => {
      this.error();
      this.form.reset();
    }
    )


    this.miServicioUser.login(this.loginData).subscribe((data:any) => {

      this.Loading();
      this.router.navigate(['dashboard'])
    },err => {
      this.error();
      this.form.reset();
    }
    )*/
    
    console.log(this.form);
    const correo = this.form.value.correo;
    const contrasena = this.form.value.contrasena;

    if(correo == 'carvajal' && contrasena == 'carvajal'){
      //Redirecciona,os al dashboard
      this.Loading();
    }else {
      //Mostramos un mensaje de error
      this.error();
      this.form.reset();
    } 
  }
  
  error() {
    this._snackBar.open('Usuario o Contraseña Incorrecta', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  Loading(){
    this.loading = true
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }

}