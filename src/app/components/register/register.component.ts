import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loginData = {
    correo:'',
    contrasena: '',
    rcontrasena:'',
  }
  form: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private router: Router, private miServicioUser: UserService){
    this.form = this.fb.group({
      correo: ['',Validators.email],
      contrasena: ['', Validators.required],
      rcontrasena:['', Validators.required],
    })
  }
  ngOnInit(): void {
    
  }
  register() {
    this.miServicioUser.register(this.loginData).subscribe((data:any) => {
      console.log(data);
      this._snackBar.open('Usuario Creado', 'con exito', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      })

      this.Loading();
    },err => {
      this.error();
      this.form.reset();
    }
    ) 
  }

  Loading(){
    this.loading = true
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1500);
  }

  error() {
    this._snackBar.open('Opcion no valida', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
