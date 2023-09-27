import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Finca } from 'src/app/interfaces/finca';
import { FincaService } from 'src/app/services/finca.service';

@Component({
  selector: 'app-crear-finca',
  templateUrl: './crear-finca.component.html',
  styleUrls: ['./crear-finca.component.css']
})
export class CrearFincaComponent {
  
  modeli: Finca = {
    Nombre_finca: '',
    Departamento: '',
    Municipio: '',
    Descripcion:'',
  }
 
  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private miServicio: FincaService) {
    this.form = this.fb.group({
      Nombre_finca: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      Municipio: ['',    [Validators.required]],
      Descripcion: ['',  [Validators.required]],
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
    });
  };

  dataSource: any;

  guardar() {
    this.miServicio.Finca(this.form.value).subscribe({
      next: (data: any) => {
        this.mensaje();
        this.router.navigate(['/dashboard/finca'])
      },
      error: err => {
        this.error();
      },
      complete() { 
      },
    })
  };

  mensaje() {
    setTimeout(() => {
      this._snackBar.open('Finca añadida', 'con exito', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }, 1500);
  }

  error() {
    this._snackBar.open('No se pudo añadir la finca', 'lo sentimos', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
