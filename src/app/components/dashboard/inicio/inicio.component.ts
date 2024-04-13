import { Component } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public chart!: Chart;

  ngOnInit(): void {

    const data = {
      labels: [
        'Humedad',
        'Temperatura(°C)',
        'Conductividad',
        'Nitrogeno(kg/ha)',
        'Fosforo(kg/ha)',
        'Potasio(mg/L)',
      ],
      datasets: [{
        label: '',
        data: [30,60,20,50,10,40],
        backgroundColor: [
          'rgb(128,0,128)',
          'rgb(0, 191,255)',
          'rgb(255, 239, 0)',
          'rgb(255, 0, 0)',
          'rgb(0, 255, 0)',
          'rgb(0, 0, 255)',
        ],
        hoverOffset: 4
      }]
    };

  /*  const data1 = {
      labels: [
        'Nitrogeno(kg/ha)',
        'Fosforo(kg/ha)',
        'Potasio(mg/L)',
      ],
      datasets: [{
        label: '',
        data: [50,10,40],
        backgroundColor: [
          'rgb(255, 0, 0)',
          'rgb(0, 255, 0)',
          'rgb(0, 0, 255)',
        ],
        hoverOffset: 4
      }]
    };
*/
    this.chart = new Chart("chart", {
      type: 'doughnut' as ChartType,  
      data : data
    })
/*
    this.chart = new Chart("chart1", {
      type: 'doughnut' as ChartType,
      data : data1
    })
   */ 
  }
}


