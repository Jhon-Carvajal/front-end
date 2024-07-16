import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public chart!: Chart;
  nombre: string = "";
  apellidos: string = "";

  ngOnInit(): void {
    this.initializeChart();
    this.updateDateTime();
  }

  initializeChart(): void {
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
        data: [30, 60, 20, 50, 10, 40],
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

    this.chart = new Chart("chart", {
      type: 'doughnut' as ChartType,
      data: data
    });
  }

  updateDateTime(): void {
    const now = new Date();
    const datetimeElement = document.getElementById('datetime');

   const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true
};

const date = new Date();
const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
    if (datetimeElement) {
      datetimeElement.textContent = formattedDate;
    }

    setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', options);
      if (datetimeElement) {
        datetimeElement.textContent = formattedDate;
      }
    }, 1000);
  }

}


