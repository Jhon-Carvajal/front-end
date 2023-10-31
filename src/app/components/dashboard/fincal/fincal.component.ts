import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FincaService } from 'src/app/services/finca.service';
import { Finca } from 'src/app/interfaces/finca';


@Component({
  selector: 'app-fincal',
  templateUrl: './fincal.component.html',
  styleUrls: ['./fincal.component.css']
})
export class FincalComponent implements OnInit {
  listFincas: Finca[]=[];
  fincas : Finca[]=[];

  displayedColumns: string[] = ['Nombre_finca', 'Departamento', 'Municipio','Descripcion','Lotes','Acciones'];
  
  dataSource : any ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  model: Finca={
    Nombre_finca :" ",
    Departamento:"",
    Municipio:"",
    Descripcion:"",
  }

  constructor(private fincaService: FincaService, private router:Router) {}

  ngOnInit(): void {
    this.cargarFincas();
    this.listar();
  }

  listar():void{
    this.fincaService.listar().subscribe((data:any) => {
      console.log(data)
      this.dataSource=new MatTableDataSource<Finca>(data as Finca[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 
  
 
  cargarFincas(){
    this.dataSource = new MatTableDataSource(this.listFincas);
  }
 
  eliminarFinca(id: string): void {
    const confirmarEliminar = confirm("¿Está seguro que quiere eliminar la finca?"); 
    if (confirmarEliminar) {
      this.fincaService.eliminarFinca(id)
        .subscribe(data => {
          alert("La finca ha sido eliminada correctamente");
          this.ngOnInit(); //cargar la lista de fincas después de eliminar
        });
    }
  }
 editarFinca(id:string): void {
  const confirmarEditar = confirm("¿Está seguro que quiere editar la finca?");
   if (confirmarEditar) {
    this.router.navigate(['/dashboard/actualizarf',id]);
  }
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



