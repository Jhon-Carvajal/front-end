import { Component,OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared.data'
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lote } from 'src/app/interfaces/lote';
import { LoteService } from 'src/app/services/lote.service';
import { Finca } from 'src/app/interfaces/finca';

@Component({
  selector: 'app-crearl',
  templateUrl: './crearl.component.html',
  styleUrls: ['./crearl.component.css']
})
export class CrearlComponent{
  
  modeli: Lote = {
    Area: '',
    Fecha_siembra: '',
  }
 
  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private miServicio: LoteService,
              private sharedDataService: SharedDataService) {
    this.form = this.fb.group({
      Area : ['', [Validators.required]],
      Fecha_siembra : ['', [Validators.required]],
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
      id_finca : this.sharedDataService.getID(),
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

  mensajeli() {
    setTimeout(() => {
      this._snackBar.open('Lote eliminado', 'con exito', {
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

  errorli() {
    this._snackBar.open('No se pudo eliminar el lote', 'lo sentimos', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}

export class DatepickerOverviewExample {}

