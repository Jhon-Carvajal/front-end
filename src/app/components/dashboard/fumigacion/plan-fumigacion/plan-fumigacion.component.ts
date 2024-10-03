import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Fumigacion } from 'src/app/interfaces/fumigacion';
import { FumigacionService } from 'src/app/services/fumigacion.service';
import { Nutricion } from 'src/app/interfaces/plan_nutricion';
import { NutricionService } from 'src/app/services/nutricion.service';
import { Cosecha } from 'src/app/interfaces/cosecha';
import { CosechaService } from 'src/app/services/cosecha.service';
import { SharedDataService } from 'src/app/services/shared.data';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-plan-fumigacion',
  templateUrl: './plan-fumigacion.component.html',
  styleUrls: ['./plan-fumigacion.component.css'],

})
export class PlanFumigacionComponent implements OnInit {
  
  //fumigacion
  listFumigacion: Fumigacion[] = [];
  idLote: string = '';

  displayedColumns: string[] = ['Tipo fumigacion', 'Fecha aplicacion', 'Costo', 'Observaciones', 'Acciones'];
  dataSource!: MatTableDataSource<Fumigacion>;
  datasource1: any;

  formulariof!: FormGroup;
  //nutricion
  listNutricion: Nutricion[] = [];
  nutricioni: Nutricion[] = [];

  displayedColumns1: string[] = ['Tipo Fertilizante', 'Fecha aplicacion', 'Costo', 'Observaciones', 'Acciones'];
 
  //cosecha
  listcosecha: Cosecha[] = [];
  cosecha1: Cosecha[] = [];
  datasource2!: any;
  formc!: FormGroup;
  displayedColumns2: string[] = ['Fecha de recoleccion','Produccion','Acciones'];

  //seleccion de el lote correspondiente a la información
  SelectedLoteid: string | null = null;

  formn!: FormGroup;
  showFormf = false;
  showFormN = false;
  showFormC = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //formulario fumigacion
  modelf: Fumigacion = {
    Tipo_f: '',
    Fecha_f: '',
    Costo_f: '',
    Observaciones_f: '',
    id_usuario: "",
    id_lote: "",
  }
  //formulario Nutricion
  modeln: Nutricion = {
    Tipo_n: '',
    Fecha_n: '',
    Costo_n: '',
    Observaciones_n: '',
    id_usuario: "",
    id_lote:"",
  }
  //formulario Cosecha
  modelc: Cosecha = {
    Fecha_recoleccion: '',
    Produccion: '',
    id_usuario: '',
    id_lote: '',
  }
  
  constructor(private fumigacionService: FumigacionService,
    private nutricionservice: NutricionService,
    private cosechaservice: CosechaService,
    private fb: FormBuilder,
    private dataservice: SharedDataService,
    private toastr: ToastrService,
    private userService: UserService,) {
    this.dataservice.currentIdLote.subscribe((idLote) => {
      this.formulariof = this.fb.group({
        Tipo_f: ['', [Validators.required]],
        Fecha_f: ['', [Validators.required]],
        Costo_f: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        Observaciones_f: ['', [Validators.required]],
        id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
        id_lote: idLote,
      });
    });
  }
  
ngOnInit(): void {
  this.cargarFumigaciones();
  this.listarf();
  this.cargarNutriciones();
  this.listarN();
  this.cargarcosechas();
  this.listarC();
  this.dataservice.currentIdLote.subscribe((idLote) => {
      this.formn = this.fb.group({
        Tipo_n: ['', [Validators.required]],
        Fecha_n: ['', [Validators.required]],
        Costo_n: ['', [Validators.required]],
        Observaciones_n: ['', [Validators.required]],
        id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
        id_lote: idLote,
      });
      
      this.formc = this.fb.group({
        Fecha_recoleccion: ['', [Validators.required]],
        Produccion: ['', [Validators.required]],
        id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
        id_lote: idLote,
      });    
    
    });
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

  listarN(): void{
    const userId = this.userService.usuarioSesionActiva._id;
    const loteid = this.idLote;
    this.dataservice.currentIdLote.subscribe((loteid) => {
      const userId = this.userService.usuarioSesionActiva._id;
      this.nutricionservice.listarN().subscribe((data: Nutricion[]) => {         
        const nutriciones = data.filter((nut: Nutricion) => nut.id_usuario === userId && nut.id_lote === loteid);
       // console.log(fumigaciones)
      this.datasource1 = new MatTableDataSource<Nutricion>(nutriciones);      
      });
    })
  }

  listarC(): void{
    const userId = this.userService.usuarioSesionActiva._id;
    const loteid = this.idLote;
    this.dataservice.currentIdLote.subscribe((loteid) => {
      const userId = this.userService.usuarioSesionActiva._id;
      this.cosechaservice.listarC().subscribe((data: Cosecha[]) => {         
        const cosechasc = data.filter((cos : Cosecha) => cos.id_usuario === userId && cos.id_lote === loteid);
       // console.log(cosechasc)
      this.datasource2 = new MatTableDataSource<Cosecha>(cosechasc);      
      });
    })
  } 

  cargarNutriciones() {
    this.datasource1 = new MatTableDataSource(this.listNutricion);
  }
 
  cargarFumigaciones() {
   this.dataSource = new MatTableDataSource(this.listFumigacion);
  }

  cargarcosechas() {
    this.datasource2 = new MatTableDataSource(this.listcosecha);
  }

  
  guardarf() {
    this.fumigacionService.Fumigacion(this.formulariof.value).subscribe({
      next: (data: any) => {
        const id_fumigacion = data._id;
        //console.log("fumigacion creada",id_fumigacion);
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

  guardarN() {
    this.nutricionservice.Nutricion(this.formn.value).subscribe({
      next: (data: any) => {
        const id_nutricion = data._id;
        console.log("Nutrición creada",id_nutricion);
        this.mensajen();
        this.formn.clearValidators();
        this.showFormN = false;
        this.ngOnInit();
      },
      error: err => {
        this.errorn();
      },
      complete() {
      },
    })
  };

  guardarC() {
    this.cosechaservice.Cosechas(this.formc.value).subscribe({
      next: (data: any) => {
        const id_cosecha = data._id;
        console.log("Cosecha creada",id_cosecha);
        this.mensajec();
        this.formc.clearValidators();
        this.showFormC = false;
        this.ngOnInit();
      },
      error: err => {
        this.errorc();
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
 
 eliminarN(id: string): void {
  this.toastr.warning('Esta seguro que quiere eliminar el plan de nutricion', 'Confirmar', {
    closeButton: true,
    timeOut: 6000, // tiempo de espera 
    extendedTimeOut: 2000,
    positionClass: 'toast-top-center',
   }).onTap.subscribe(() => {
    this.nutricionservice.eliminarNutricion(id)
      .subscribe(data => {
        this.toastr.success('El Plan de nutricion ha sido eliminado', 'con exito');
        this.ngOnInit();
      });
   });
  }
 
 eliminarC(id: string): void {
  this.toastr.warning('Esta seguro que quiere eliminar la cosecha', 'Confirmar', {
    closeButton: true,
    timeOut: 6000, // tiempo de espera 
    extendedTimeOut: 2000,
    positionClass: 'toast-top-center',
   }).onTap.subscribe(() => {
    this.cosechaservice.eliminarCosecha(id)
      .subscribe(data => {
        this.toastr.success('La cosecha ha sido eliminada', 'con exito');
        this.ngOnInit();
      });
   });
  }

  mensajen() {
    setTimeout(() => {
      this.toastr.success('Nutricion añadida', 'con exito')
    })
  }
  errorn() {
    this.toastr.error('No se pudo añadir la Nutricion', 'lo sentimos')
  }

  mensajec() {
    setTimeout(() => {
      this.toastr.success('Cosecha añadida', 'con exito')
    })
  }
  errorc() {
    this.toastr.error('No se pudo añadir la cosecha', 'lo sentimos')
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
  toggleFormn() {
    this.showFormN = !this.showFormN;
  }
  toggleFormc() {
    this.showFormC = !this.showFormC;
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
