import { Component, OnInit,Inject} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FincaService } from 'src/app/services/finca.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizarf',
  templateUrl: './actualizarf.component.html',
  styleUrls: ['./actualizarf.component.css']
})
export class ActualizarfComponent implements OnInit {


 /* Municipios: any[] = ['Almaguer','Argelia','Balboa','Bolívar','Buenos Aires','Cajibío','Caldono','Caloto','Corinto',
                       'El Tambo','Florencia','Guachené','Guapí','Inzá','Jambaló','La Sierra','La Vega','López de Micay',
                       'Mercaderes','Miranda','Morales','Padilla','Páez','Patía','Piamonte','Piendamó','Popayán',
                       'Puerto Tejada','Puracé','Rosas','San Sebastián','Santander de Quilichao','Santa Rosa','Silvia',
                       'Sotará','Suárez','Sucre','Timbío','Timbiquí','Toribío','Totoró','Villa Rica']
  Departamentos: any[] = ['Cauca']
*/
  
  form: FormGroup;
  fincaId: string;

  constructor(private fb: FormBuilder,private router:Router,private fincaService: FincaService, private route: ActivatedRoute,
              private SnackBar:MatSnackBar,private dialogRef:MatDialogRef<ActualizarfComponent>,
              @Inject (MAT_DIALOG_DATA) private data: {fincaId:string,Nombe_finca:string,Departamento:string,
               Municipio:string,Descripcion:string,id:number})
               {
      this.fincaId= data.fincaId;
      this.form = this.fb.group({

      Nombre_finca: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      Municipio: ['',    [Validators.required]],
      Descripcion: ['',  [Validators.required]],
    })
  }
  cerrar(){
    this.dialogRef.close();
  }

  guardarEdicion(): void {
    this.form.value.fincaId = this.fincaId;
    this.fincaService.actualizarFinca(this.fincaId, this.form.value).subscribe((data) => {
       this.router.navigate(['/dashboard/finca']);
       window.location.reload();
    });
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}

 

 
                
              
               


             

