import { Component,OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared.data'
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lote } from 'src/app/interfaces/lote';
import { LoteService } from 'src/app/services/lote.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crearl',
  templateUrl: './crearl.component.html',
  styleUrls: ['./crearl.component.css']
})
export class CrearlComponent implements OnInit{
  
  modeli: Lote = {
    Nombre: '',
    Area: '',
    Fecha_siembra: '',
    Variedad : '',
    Caracteristica : '',
    id_usuario: "",
    id_finca:"",
  }

  Numeros: any[] = ['1','2','3','4','5','6','7','8','9']
  
  form!: FormGroup;
  archivos: File[] = [];

  constructor( private fb: FormBuilder,
               private _snackBar: MatSnackBar,
               private router: Router,
               private miServicio: LoteService,
               private toastr: ToastrService,
               private sharedDataService: SharedDataService,) { }

ngOnInit(): void {
     this.sharedDataService.currentIdFinca.subscribe((idFinca) => {
       this.form = this.fb.group({
        Nombre:  ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        Area: ['', [Validators.required]],
        Fecha_siembra: ['', [Validators.required]],
        Variedad: ['', [Validators.required]],
        Caracteristica: ['',[Validators.required]],
        id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',   
        id_finca: idFinca,
      });
    });
  }

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
      this.toastr.success('Lote añadido', 'con exito')
    })
  }

  errorl() {
    this.toastr.error('No se pudo añadir el lote', 'lo sentimos')
  }

}

export class DatepickerOverviewExample {}

