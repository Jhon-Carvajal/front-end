import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FincaService } from 'src/app/services/finca.service';
import { Finca } from 'src/app/interfaces/finca';
import { Lote }  from 'src/app/interfaces/lote'
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { LoteService } from 'src/app/services/lote.service'
import { SharedDataService } from 'src/app/services/shared.data';

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
  
  dataSource : any ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  model: Finca = {
    Nombre_finca :" ",
    Departamento:"",
    Municipio:"",
    Descripcion: "",
    id_usuario: "",
  }

  constructor( private fincaService: FincaService,
               private router: Router,
               private userService: UserService,
               private toastr: ToastrService,
               private dataservice: SharedDataService,
               private loteservice: LoteService,
             ) { }
  
  ngOnInit(): void {
    this.cargarFincas();
    this.listar();
    }

  listar(): void{
    const userId = this.userService.usuarioSesionActiva._id;
    //console.log('ID del usuario en sesion:', userId);
    const finca = this.idFinca;
    //console.log("id de la finca",fincaa)
     /*
    this.fincaService.listar().subscribe((data: any) => {
      const fincasDelUsuario = data.filter((finca: Finca) => finca.id_usuario === userId);

    console.log(fincasDelUsuario);
      console.log(data)
      this.dataSource=new MatTableDataSource<Finca>(data as Finca[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      */
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
 
 eliminarFinca(id: string): void {
  this.toastr.warning('Esta seguro que quiere eliminar la Finca', 'Confirmar Eliminacion', {
    closeButton: true,
    timeOut: 6000, // tiempo de espera 
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

/* editarFinca(id:string): void {
  const confirmarEditar = confirm("¿Está seguro que quiere editar la finca?");
   if (confirmarEditar) {
    this.router.navigate(['/dashboard/actualizarf',id]);
  }
 }*/
  Obtener(id: string): void{
    const fincaid = id;
    console.log("id de la finca", fincaid);
    this.dataservice.changeIdFinca(fincaid);
    this.idFinca = fincaid;
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

}



