import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Finca } from 'src/app/interfaces/finca';

@Component({
  selector: 'app-crear-finca',
  templateUrl: './crear-finca.component.html',
  styleUrls: ['./crear-finca.component.css']
})
export class CrearFincaComponent  {
  

  loginData = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    fecha_registro: new Date().toISOString(),
  }

  Departamento: any[] = ['Cauca']
  Municipio: any[] = ['Timbio','Mercaderes','Popayan']

  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha_registro: new Date().toISOString(),
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
      curriculum: ['', [Validators.required, this.validadorArchivo(3 * 1024 * 1024)]]
    });
  };

  validadorArchivo(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const archivo = control.value;
      const esDemasiadoGrande = archivo && archivo.size > maxSize;
      return esDemasiadoGrande ? { 'tamanoArchivo': { value: control.value } } : null;
    };
  };

  

  mensaje() {
    setTimeout(() => {
      this._snackBar.open('Finca guardado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }, 1500);
  }

  error() {
    this._snackBar.open('No se pudo guardar la finca', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}

