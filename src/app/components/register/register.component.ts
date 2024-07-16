import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loginData = {
    nombre: '',
    apellidos:'',
    correo:'',
    contrasena: '',
    rcontrasena:'',
  }
  form: FormGroup;
  hide1 = true;
  
  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router,
              private miServicioUser: UserService,
              private toastr: ToastrService) {
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['',Validators.email],
      contrasena: ['', Validators.required],
      rcontrasena:['', Validators.required],
    })
  }
  ngOnInit(): void {
    
  }
  register() {
    const contrasena = this.form.value.contrasena;
    const rcontrasena = this.form.value.rcontrasena;

    if (contrasena !== rcontrasena) {
      this.toastr.error('Las contraseñas ingresadas no coinciden', 'Error');
      this.toastr.error('Opcion no valida', '')
      return;
    }

    this.miServicioUser.register(this.loginData).subscribe((data:any) => {
      console.log(data);
      this.toastr.success('con exito','Usuario Creado')
      this.Loading();

    },err => {
      this.form.reset();
    }
    ) 
  }

  Loading(){
      setTimeout(() => {
      this.router.navigate(['login']);
    }, 1500);
   }
  }


