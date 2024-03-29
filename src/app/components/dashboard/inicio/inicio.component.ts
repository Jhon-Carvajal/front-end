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
      ],
      datasets: [{
        label: '',
        data: [30,60,20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4
      }]
    };

    const data1 = {
      labels: [
        'Nitrogeno(kg/ha)',
        'Fosforo(kg/ha)',
        'Potasio(mg/L)',
      ],
      datasets: [{
        label: '',
        data: [50,10,40],
        backgroundColor: [
          'rgb(0, 205, 125)',
          'rgb(255, 205, 200)',
          'rgb(255, 0, 255)',
        ],
        hoverOffset: 4
      }]
    };
    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType,  
      data : data
    })

    this.chart = new Chart("chart1", {
      type: 'doughnut' as ChartType,
      data : data1
    })
    
  }
}


