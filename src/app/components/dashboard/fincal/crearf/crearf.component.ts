import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Finca } from 'src/app/interfaces/finca';
import { FincaService } from 'src/app/services/finca.service';
import { SharedDataService } from 'src/app/services/shared.data'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crearf',
  templateUrl: './crearf.component.html',
  styleUrls: ['./crearf.component.css']
})
export class CrearFComponent {
  
  modeli: Finca = {
    Nombre_finca: '',
    Departamento: '',
    Municipio: '',
    Descripcion: '',
    id_usuario:'',
  }

  Municipios: any[] = ['Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto',
    'El Tambo', 'Florencia', 'Guachené', 'Guapí', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López de Micay',
    'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó', 'Popayán',
    'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santander de Quilichao', 'Santa Rosa', 'Silvia',
    'Sotará', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica']
  Departamentos: any[] = ['Cauca']

 
  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private miServicio: FincaService,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService) {
    this.form = this.fb.group({
      Nombre_finca: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      Municipio: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]', 
    });
  };

  dataSource: any;

  guardar() {
    this.miServicio.Finca(this.form.value).subscribe({
      next: (data: any) => {
        const id_finca = data._id;
        console.log("finca creada",id_finca);
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
      this.toastr.success('Finca añadida', 'con exito')
    })
  }

  error() {
    this.toastr.error('No se pudo añadir la finca', 'lo sentimos')
  }
}
