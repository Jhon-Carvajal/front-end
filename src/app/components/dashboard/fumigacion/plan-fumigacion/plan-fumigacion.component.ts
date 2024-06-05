import { Component, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LoteService } from 'src/app/services/lote.service'
import { Fumigacion } from 'src/app/interfaces/fumigacion';
import { FumigacionService } from 'src/app/services/fumigacion.service';
import { Nutricion } from 'src/app/interfaces/plan_nutricion';
import { NutricionService } from 'src/app/services/nutricion.service';
import { SharedDataService } from 'src/app/services/shared.data';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-plan-fumigacion',
  templateUrl: './plan-fumigacion.component.html',
  styleUrls: ['./plan-fumigacion.component.css'],

})
export class PlanFumigacionComponent implements OnInit {
  
  
  listFumigacion: Fumigacion[]=[];
  fincas : Fumigacion[]=[];
  idFinca: string = '';
  idLote: string = '';

  displayedColumns: string[] = ['Tipo fumigacion', 'Fecha aplicacion', 'Costo', 'Observaciones','Acciones'];
  dataSource!: MatTableDataSource<Fumigacion>;
  formulariof!: FormGroup;
  
  selectedFincaId: string | null = null;
  SelectedLoteid: string | null = null;
  form!: FormGroup
  showFormf = false;
  showForml = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

//formulario fumigacion
   modelf: Fumigacion = {
    Tipo_f: '',
    Fecha_f: '',
    Costo_f :'',
    Observaciones_f : '',
    id_usuario: "",
    id_lote:"",
  }
/*  //Formulario lote y café 
  modeli: Lote = {
    Nombre: '',
    Area: '',
    Fecha_siembra: '',
    Variedad : '',
    Caracteristica : '',
    id_usuario: "",
    id_finca: "",
  }
*/
   constructor(private fumigacionService: FumigacionService,
               private fb: FormBuilder,
               private dataservice: SharedDataService,
               private toastr: ToastrService,
               private userService: UserService,) { 
               this.dataservice.currentIdLote.subscribe((idLote) => {
                this.formulariof = this.fb.group({
                 Tipo_f: ['', [Validators.required]],
                 Fecha_f: ['', [Validators.required]],
                 Costo_f: ['', [Validators.required,Validators.pattern(/^\d+$/)]],
                 Observaciones_f: ['', [Validators.required]],
                 id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]', 
                 id_lote: idLote,       
      });
    });   
   }
  
ngOnInit(): void {
  this.cargarFumigaciones();
  this.listarf();
    }
 
  listarf(): void{
    const userId = this.userService.usuarioSesionActiva._id;
    const loteid = this.idLote;
    this.dataservice.currentIdLote.subscribe((loteid) => {
      const userId = this.userService.usuarioSesionActiva._id;
      this.fumigacionService.listarf().subscribe((data: Fumigacion[]) => {         
        const fumigaciones = data.filter((fum: Fumigacion) => fum.id_usuario === userId && fum.id_lote === loteid);
       // console.log(fumigaciones)
      this.dataSource = new MatTableDataSource<Fumigacion>(fumigaciones);      
      });
    })
  } 
 
  cargarFumigaciones() {
   this.dataSource = new MatTableDataSource(this.listFumigacion);
  }
  
  guardarf() {
    this.fumigacionService.Fumigacion(this.formulariof.value).subscribe({
      next: (data: any) => {
        const id_fumigacion = data._id;
        console.log("fumigacion creada",id_fumigacion);
        this.mensaje();
        this.formulariof.clearValidators();
        this.showFormf = false;
        this.ngOnInit();
      },
      error: err => {
        this.error();
      },
      complete() {
      },
    })
  };

  eliminarFum(id: string): void {
  this.toastr.warning('Esta seguro que quiere eliminar el plan de fumigacion', 'Confirmar', {
    closeButton: true,
    timeOut: 6000, // tiempo de espera 
    extendedTimeOut: 2000,
    positionClass: 'toast-top-center',
   }).onTap.subscribe(() => {
    this.fumigacionService.eliminarF(id)
      .subscribe(data => {
        this.toastr.success('El Plan de fumigacion ha sido eliminado', 'con exito');
        this.ngOnInit();
      });
   });
  }
 
  mensaje() {
    setTimeout(() => {
      this.toastr.success('Fumigacion añadida', 'con exito')
    })
  }

  error() {
    this.toastr.error('No se pudo añadir la fumigacion', 'lo sentimos')
  } 
  

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  toggleFormf() {
    this.showFormf = !this.showFormf;
  }

  Obtener(id: string): void{
    const loteid = id;
    this.dataservice.changeIdLote(loteid);
    //console.log("id del lote", loteid);
    this.idLote = loteid;
    this.SelectedLoteid = id;
    this.listarf();
  }
  

}
