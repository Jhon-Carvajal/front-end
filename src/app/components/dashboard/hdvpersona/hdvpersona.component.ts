import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';



@Component({
  selector: 'app-hdvpersona',
  templateUrl: './hdvpersona.component.html',
  styleUrls: ['./hdvpersona.component.css']
})
export class HdvpersonaComponent implements OnInit {

  listPersonas: Persona[] =[];
  personas : Persona[] = [];

  displayedColumns: string[] = ['nombres', 'cargo_aspirado', 'correo', 'telefono','ciudad','fecha_registro','HdV'];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
 
  constructor(private personaService: PersonaService, private router:Router) {}

  ngOnInit(): void {
    this.cargarPersonas();
    this.listar();
  }

  listar():void{
    this.personaService.listar().subscribe((data:any) => {
      console.log(data)
      this.dataSource=new MatTableDataSource<Persona>(data as Persona[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  mostrarPDF(curriculum: string) {
    const base64Byte = atob(curriculum);
    const cantidadByte = new Array(base64Byte.length);

    for (let index = 0; index < base64Byte.length; index++) {
      cantidadByte[index] = base64Byte.charCodeAt(index);
    };

    const byteArray = new Uint8Array(cantidadByte);
    const blob = new Blob([byteArray], {type: "application/pdf"})

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.target = "_blank";

    link.click();

    URL.revokeObjectURL(link.href); 
  };

  cargarPersonas(){
    this.dataSource = new MatTableDataSource(this.listPersonas);
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