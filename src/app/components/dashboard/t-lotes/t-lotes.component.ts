import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Lote } from '../../../interfaces/lote';
import { LoteService } from 'src/app/services/lote.service'

@Component({
  selector: 'app-t-lotes',
  templateUrl: './t-lotes.component.html',
  styleUrls: ['./t-lotes.component.css']
})
export class TLotesComponent implements OnInit {

    listlotes: Lote[]=[];
    lotes : Lote[]=[];
  
    displayedColumns: string[] = ['Area', 'Fecha_siembra','Variedad','Acciones'];
    
    dataSource : any ;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    model: Lote={
      Area : "",
      Fecha_siembra : "",
    }
  
    constructor(private loteService: LoteService, private router:Router) {}
  
    ngOnInit(): void {
      this.cargarlotes();
      this.listarl();
      console.log(this.listarl);
    }
  
    listarl():void{
      this.loteService.listarl().subscribe((data:any) => {
        console.log(data)
        this.dataSource=new MatTableDataSource<Lote>(data as Lote[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
