import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FincaService } from 'src/app/services/finca.service';
import { Finca } from 'src/app/interfaces/finca';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fincal',
  templateUrl: './fincal.component.html',
  styleUrls: ['./fincal.component.css']
})
export class FincalComponent implements OnInit {
  fincas : Finca[]=[];
  displayedColumns: string[] = ['Numero id', 'Nombre_usuario', 'Apellido', 'Correo'];
 //displayedColumns: string[] = ['Numero id','Nombre_usuario', 'Apellido', 'Correo', 'Rol', 'Acciones1'];
  idFinca: string = '';
  idLote: string = '';
  
  dataSource!: MatTableDataSource<Finca>;
  selectedFincaId: string | null = null;
  SelectedLoteid: string | null = null;
  form!: FormGroup
  showForm = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

//formulario finca
  model: Finca = {
    _id :"",
    nombre :"",
    apellidos:"",
    correo: "",
    contrasena: "",
    rol: "",
  }

  
  constructor(private fincaService: FincaService,
               private toastr: ToastrService,
               private miServicio: FincaService,) { 
  }
  
  ngOnInit(): void {
    this.listar();
    }
 
listar(): void {
  this.miServicio.listar().subscribe({
    next: (data: Finca[]) => {
      this.fincas = data; // Asigna los datos obtenidos al array `listFincas`
      this.dataSource = new MatTableDataSource(data); // Configura la tabla con los datos
      console.log(data)
    },
    error: err => {
      this.toastr.error('Error al cargar los usuarios', 'Error');
      console.error('Error al obtener los usuarios:', err);
    }
  });
}


  eliminarFinca(id: string): void {
        this.fincaService.eliminarFinca(id)
          .subscribe(data => {
            this.toastr.success('El usuario ha sido eliminado', 'con exito');
            this.ngOnInit(); 
          });
      }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}