import { Component, OnInit,OnDestroy,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
import { SharedDataService } from 'src/app/services/shared.data';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStatus } from '../../../interfaces/authenticacion';
import Chart, { ChartType } from 'chart.js/auto';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { Dispositivo } from 'src/app/interfaces/dispositivo';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy, AfterViewInit {
  public chart!: Chart;
  @ViewChild('nitrogenoChart', { static: true }) nitrogenoChart!: ElementRef;
  charts: { [key: string]: any } = {};
  private subscription!: Subscription;

  nombre1: string;
  apellido1: string;

  constructor(
    private datos: DispositivoService,
    private userservice: UserService) {
    this.nombre1 = '';
    this.apellido1 = '';
  }

  ngOnInit(): void {
    this.updateDateTime();
    this.obtenerDatosUsuario();
    this.subscription = interval(5000) 
      .pipe(
        switchMap(() => this.datos.datosias())
      )
      .subscribe(
        (data: any) => {
          const datou = data[data.length - 1];
          if (datou) {
            const valores = {
              nitrogeno: [datou.nitrogeno],
              fosforo: [datou.fosforo],
              potasio: [datou.potasio]
            };
            this.updateCharts(valores); // Actualización de gráficos 
          }
        },
        (error) => {
          console.error('Error al obtener los datos actualizados:', error);
        }
      );
  }

  ngAfterViewInit(): void {
    const valoresIniciales = {
      nitrogeno: [0],
      fosforo: [0],
      potasio: [0]
    };

    this.initializeCharts(valoresIniciales);
  }

  obtenerDatosUsuario() {
    const datosSesion = this.userservice.getDatosSesion();
    if (datosSesion) {
      const usuario: User = JSON.parse(datosSesion);
      if (usuario.nombre && usuario.apellidos) {
        this.nombre1 = usuario.nombre;
        this.apellido1 = usuario.apellidos;
      } else {
        console.error("Los datos del usuario no contienen nombre o apellidos.");
      }
    } else {
      console.error("No hay datos de sesión disponibles.");
    }
  }

 initializeCharts(valores: any): void {
    this.charts['composicion'] = new Chart(this.nitrogenoChart.nativeElement, {
        type: 'bar' as ChartType,
        data: {
            labels: ['Nitrógeno', 'Fósforo', 'Potasio'],
            datasets: [{
                data: [
                    valores.nitrogeno[0],
                    valores.fosforo[0],
                    valores.potasio[0]
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    align:'center',
                    text: 'Composición de Nutrientes',
                    color: '#333333',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Nutrientes',
                        color: '#333333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor actual',
                        color: '#333333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

  updateCharts(valores: any): void {
    const chart = this.charts['composicion'];
    if (chart) {
      chart.data.datasets[0].data[0] = valores.nitrogeno[0]; // Actualiza el índice correspondiente
      chart.data.datasets[0].data[1] = valores.fosforo[0];
      chart.data.datasets[0].data[2] = valores.potasio[0];
      chart.update();
    }
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
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(now);
    if (datetimeElement) {
      datetimeElement.textContent = formattedDate;
    }

    setInterval(() => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(now);
      if (datetimeElement) {
        datetimeElement.textContent = formattedDate;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Detenemos la suscripción para evitar fugas de memoria
    }
  }
}