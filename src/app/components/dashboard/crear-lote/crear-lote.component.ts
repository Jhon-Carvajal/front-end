import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lote } from 'src/app/interfaces/lote';
import { LoteService } from 'src/app/services/lote.service';
import { Finca } from '../../../interfaces/finca';

@Component({
  selector: 'app-crear-lote',
  templateUrl: './crear-lote.component.html',
  styleUrls: ['./crear-lote.component.css']
})

export class CrearLoteComponent {
  
  modeli: Lote = {
    Area: '',
    Fecha_siembra: '',
  }
 
  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private miServicio: LoteService) {
    this.form = this.fb.group({
      Area : ['', [Validators.required]],
      Fecha_siembra : ['', [Validators.required]],
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
    });
  };

  dataSource: any;

  guardarl() {
    this.miServicio.lote(this.form.value).subscribe({
      next: (data: any) => {
        this.mensajel();
        this.router.navigate(['/dashboard/lote'])
      },
      error: err => {
        this.errorl();
      },
      complete() {

      },
    })
  };

  mensajel() {
    setTimeout(() => {
      this._snackBar.open('Lote añadido', 'con exito', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }, 1500);
  }

  errorl() {
    this._snackBar.open('No se pudo añadir el lote', 'lo sentimos', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}

export class DatepickerOverviewExample {}
