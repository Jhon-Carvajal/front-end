import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Lote } from 'src/app/interfaces/lote';
import { LoteService } from 'src/app/services/lote.service'
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-lotel',
  templateUrl: './lotel.component.html',
  styleUrls: ['./lotel.component.css']
})
export class LotelComponent implements OnInit {

  listlotes: Lote[]=[];
  lotes: Lote[] = [];

  displayedColumns: string[] = ['Area', 'Fecha_siembra','Finca','Variedad','Acciones'];
  
  dataSource : any ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  model: Lote={
    Area : "",
    Fecha_siembra: "",
    id_usuario: "",
    id_finca:"",
  }

  constructor(private loteService: LoteService,
              private router: Router,
              private toastr: ToastrService,
              private User:UserService,
               ) { }

  ngOnInit(): void {
    this.cargarlotes();
    this.listarl();
    console.log(this.listarl);
  }

  listarl(): void{
    const userId = this.User.usuarioSesionActiva._id;
    //console.log('ID del usuario', userId);

   /* this.loteService.listarl().subscribe((data:any) => {
      console.log(data)
      this.dataSource=new MatTableDataSource<Lote>(data as Lote[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    */
    this.loteService.listarl().subscribe((data: Lote[]) => {
    const loteDelUsuario = data.filter((lote: Lote) =>lote.id_usuario === userId);
    console.log(loteDelUsuario);

    this.dataSource = new MatTableDataSource<Lote>(loteDelUsuario);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
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
    this.dataSource = new MatTableDataSource(this.listlotes);
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
