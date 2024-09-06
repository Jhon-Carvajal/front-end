import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { SharedDataService } from 'src/app/services/shared.data';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStatus } from '../../../interfaces/authenticacion';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public chart!: Chart;
  
  nombre1: string;
  apellido1: string;

constructor(
  private userservice: UserService) { 
  this.nombre1 = '';
  this.apellido1 = '';
  }

  ngOnInit(): void {
    this.initializeChart();
    this.updateDateTime();
    this.obtenerDatosUsuario();
  }

 obtenerDatosUsuario() {
    const datosSesion = this.userservice.getDatosSesion();
    
    if (datosSesion) {
        const usuario: User = JSON.parse(datosSesion);
        
        if (usuario.nombre && usuario.apellidos) {
            this.nombre1 = usuario.nombre;
            this.apellido1 = usuario.apellidos;
            //console.log("Nombre:", this.nombre1, this.apellido1);
        } else {
            console.error("Los datos del usuario no contienen nombre o apellidos.");
        }
    } else {
        console.error("No hay datos de sesión disponibles.");
    }
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


