import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FincaService } from 'src/app/services/finca.service';
import { Finca } from '../../../interfaces/finca';


@Component({
  selector: 'app-tablafinca',
  templateUrl: './tablafinca.component.html',
  styleUrls: ['./tablafinca.component.css']
})


export class TablafincaComponent implements OnInit {
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

 /* eliminar_finca(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta finca?'))
     {
      this.fincaService.eliminar(id).subscribe(() => {
      // Actualiza la lista de fincas después de eliminar
      this.listar();
      });
    }
  }*/

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}