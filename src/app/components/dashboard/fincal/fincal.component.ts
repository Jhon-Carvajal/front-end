import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FincaService } from 'src/app/services/finca.service';
import { Finca } from 'src/app/interfaces/finca';
import { Lote } from 'src/app/interfaces/lote'
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { LoteService } from 'src/app/services/lote.service'
import { SharedDataService } from 'src/app/services/shared.data';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-fincal',
  templateUrl: './fincal.component.html',
  styleUrls: ['./fincal.component.css']
})
export class FincalComponent implements OnInit {
  listFincas: Finca[]=[];
  fincas : Finca[]=[];
  displayedColumns: string[] = ['Nombre_finca', 'Departamento', 'Municipio', 'Descripcion', 'Lotes', 'Acciones'];
  idFinca: string = '';
  idLote: string = '';
  idNombre: string = '';
  
  listlotes: Lote[]=[];
  lotes: Lote[] = [];
  
  displayedColumns1: string[] = ['Nombre','Area', 'Fecha_siembra','Variedad','Caracteristica','Ir','Acciones'];

  dataSource1: any;
  dataSource!: MatTableDataSource<Finca>
  selectedFincaId: string | null = null;
  SelectedLoteid: string | null = null;
  form!: FormGroup
  forml!:FormGroup
  showForm = false;
  showForml = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

//formulario finca
  model: Finca = {
    Nombre_finca :" ",
    Departamento:"",
    Municipio:"",
    Descripcion: "",
    id_usuario: "",
  }

  Municipios: any[] = ['Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto',
    'El Tambo', 'Florencia', 'Guachené', 'Guapí', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López de Micay',
    'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó', 'Popayán',
    'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santander de Quilichao', 'Santa Rosa', 'Silvia',
                       'Sotará', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica']
  Departamentos: any[] = ['Amazonas','Antioquia','Arauca','Atlántico','Bolívar','Boyacá','Caldas','Caquetá','Casanare',
                          'Cauca','Cesar','Chocó','Córdoba','Cundinamarca','Guainía','Guaviare','Huila','La Guajira',
                          'Magdalena','Meta','Nariño','Norte de Santander','Putumayo','Quindío','Risaralda',
                          'San Andrés y Providencia','Santander','Sucre','Tolima','Valle del Cauca','Vaupés','Vichada']
  //Formulario lote y café 
  modeli: Lote = {
    Nombre: '',
    Area: '',
    Fecha_siembra: '',
    Variedad : '',
    Caracteristica : '',
    id_usuario: "",
    id_finca: "",
  }
  
  constructor(private fincaService: FincaService,
               private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastrService,
               private loteService: LoteService,
               private miServicio: FincaService,
               private sharedDataService: SharedDataService,) { 
      this.form = this.fb.group({
      Nombre_finca: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      Municipio: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]', 
    });
  }
  
  ngOnInit(): void {
    this.cargarFincas();
    this.listar();
    this.cargarlotes();
    this.listarl();
    this.sharedDataService.currentIdFinca.subscribe((idFinca) => {
       this.forml = this.fb.group({
        Nombre:  ['', [Validators.required]],
        Area: ['', [Validators.required]],
        Fecha_siembra: ['', [Validators.required]],
        Variedad: ['', [Validators.required]],
        Caracteristica: ['',[Validators.required]],
        id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',   
        id_finca: idFinca,
      });
    });
    }
 
  listar(): void{
    const userId = this.userService.usuarioSesionActiva._id;
    //console.log('ID del usuario en sesion:', userId);
    this.fincaService.listar().subscribe((data: Finca[]) => {
    const fincasDelUsuario = data.filter((finca: Finca) =>finca.id_usuario === userId);
    //console.log(fincasDelUsuario);
    this.dataSource = new MatTableDataSource<Finca>(fincasDelUsuario);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  } 
 
  cargarFincas(){
    this.dataSource = new MatTableDataSource(this.listFincas);
  }

  guardar() {
    this.miServicio.Finca(this.form.value).subscribe({
      next: (data: any) => {
        const id_finca = data._id;
        //console.log("finca creada",id_finca);
        this.mensaje();
        this.form.clearValidators();
        this.showForm = false;
        this.ngOnInit();
      },
      error: err => {
        this.error();
      },
      complete() {
      },
    })
  };
 
  eliminarFinca(id: string): void {
  this.loteService.listarl().subscribe((data: Lote[]) => {
    const lotesAsignados = data.filter((lote: Lote) => lote.id_finca === id);
    if (lotesAsignados.length > 0) {
        this.toastr.error('No se puede eliminar la finca porque tiene lotes asignados.', 'Error al eliminar');
    } else {
        this.toastr.warning('Esta seguro que quiere eliminar la Finca', 'Confirmar Eliminacion', {
        closeButton: true,
        timeOut: 6000, 
        extendedTimeOut: 2000,
        positionClass: 'toast-top-center', 
      }).onTap.subscribe(() => {
        this.fincaService.eliminarFinca(id)
          .subscribe(data => {
            this.toastr.success('La finca ha sido eliminada', 'con exito');
            this.ngOnInit(); 
          });
      });
     }
   });
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
   
  mensaje() {
    setTimeout(() => {
      this.toastr.success('Finca añadida', 'con exito')
    })
  }

  error() {
    this.toastr.error('No se pudo añadir la finca', 'lo sentimos')
  } 
  
  Obtener(id: string): void{
    const fincaid = id;
    //console.log("id de la finca", fincaid);
    this.sharedDataService.changeIdFinca(fincaid);
    this.idFinca = fincaid;
    this.selectedFincaId = id;
    this.listar();
  }

  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //tabla de lote
  listarl(): void {
          
    this.sharedDataService.currentIdFinca.subscribe((idFinca) => {
      const userId = this.userService.usuarioSesionActiva._id;
      this.loteService.listarl().subscribe((data: Lote[]) => {         
      const lotesDelUsuarioYFinca = data.filter((lote: Lote) => lote.id_usuario === userId && lote.id_finca === idFinca);
        //console.log(lotesDelUsuarioYFinca);
        this.dataSource1 = new MatTableDataSource<Lote>(lotesDelUsuarioYFinca);   
      });
    })
  }
  
  eliminarLote(id: string): void {
  this.toastr.warning('Esta seguro que quiere eliminar el lote', 'Confirmar Eliminacion', {
    closeButton: true,
    timeOut: 6000, // tiempo de espera 
    extendedTimeOut: 2000,
    positionClass: 'toast-top-center',
   }).onTap.subscribe(() => {
    this.loteService.eliminarl(id)
      .subscribe(data => {
        this.toastr.success('El lote ha sido eliminado', 'con exito');
        this.ngOnInit();
      });
   });
  }
  
  cargarlotes(){
    this.dataSource1 = new MatTableDataSource(this.listlotes);
  }
  //guardar lote
  guardarl() {
    this.loteService.lote(this.forml.value).subscribe({
      next: (data: any) => {
        const id_lote = data._id;
     //   console.log("lote creado",id_lote);
        this.mensajel();
        this.forml.clearValidators;
        this.showForml = false;
        this.ngOnInit();
      },
      error: err => {
        this.errorl();
      },
      complete() {
      },
    })
  };
  obtenerIdLote(id: string) {
    const loteid = id;
    //console.log("ID del lote:", loteid);
    this.sharedDataService.changeIdLote(loteid);
    this.idLote = loteid;
    this.SelectedLoteid = id;
    this.listarl();
  }
  mensajel() {
    setTimeout(() => {
      this.toastr.success('Lote añadido', 'con exito')
    })
  }

  errorl() {
    this.toastr.error('No se pudo añadir el lote', 'lo sentimos')
  }
  toggleForml() {
    this.showForml = !this.showForml;
  }
}