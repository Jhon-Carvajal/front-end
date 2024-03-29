import { Component, OnInit } from '@angular/core';

interface PeriodicElement {
 name: string;
 position: number;
 weight: number;
 symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', position: 1, weight: 1.0079, symbol: 'H' },
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
 
];

@Component({
  selector: 'app-plan-nutricion',
  templateUrl: './plan-nutricion.component.html',
  styleUrls: ['./plan-nutricion.component.css'],
})
export class PlanNutricionComponent { 
 displayedColumns: string[] = [ 'name','position', 'weight', 'symbol'];
  dataSource3 = ELEMENT_DATA;
}