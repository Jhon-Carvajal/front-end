import { Component, OnInit,OnDestroy,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
import { FincaService } from 'src/app/services/finca.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { SharedDataService } from 'src/app/services/shared.data';
import Chart, { ChartType } from 'chart.js/auto';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css']
})
export class IaComponent implements OnInit, OnDestroy, AfterViewInit {

  chart: any;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('humedadChart') humedadChart!: ElementRef;
  @ViewChild('temperaturaChart') temperaturaChart!: ElementRef;
  @ViewChild('conductividadChart') conductividadChart!: ElementRef;
  @ViewChild('nitrogenoChart') nitrogenoChart!: ElementRef;
  @ViewChild('fosforoChart') fosforoChart!: ElementRef;
  @ViewChild('potasioChart') potasioChart!: ElementRef;
  @ViewChild('bateriaChart') bateriaChart!: ElementRef;

  charts: { [key: string]: any } = {};
  private subscription!: Subscription; 
 
  constructor(  private datos: DispositivoService, 
                private sharedDataService: SharedDataService,) {
              }
  
  ngOnInit(): void {
    // actualización 
    this.subscription = interval(10000) // Cada 60 segundos
      .pipe(
        switchMap(() => this.datos.datosias()) 
      )
      .subscribe(
        (data: any) => {
          //console.log('Datos actualizados:', data);
          //último registro 
          const datou = data[data.length - 1]; 
          if (datou) {
            const valores = {
              humedad: datou.humedad,
              temperatura: datou.temperatura,
              conductividad: datou.conductividad,
              bateria: datou.bateria,
              nitrogeno: datou.nitrogeno,
              fosforo: datou.fosforo,
              potasio: datou.potasio
            };
            this.updateCharts(valores); // Actualización de gráficos 
          }
        },
        (error) => {
          console.error('Error al obtener los datos actualizados:', error);
        }
      );
  }

  // Inicio de gráficos
  ngAfterViewInit(): void {
    const valoresIniciales = {
      humedad: [25],
      temperatura: [18],
      conductividad: [0.2],
      bateria:[100],
      nitrogeno: [100],
      fosforo: [20],
      potasio: [120]
    };

    this.initializeCharts(valoresIniciales);
  }

  // Inicializa con valores de mongo
  initializeCharts(valores: any): void {
    this.charts['humedad'] = new Chart(this.humedadChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['%'],
        datasets: [{
          label: 'Humedad',
          data: valores.humedad,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });

    this.charts['temperatura'] = new Chart(this.temperaturaChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['°C'],
        datasets: [{
          label: 'Temperatura',
          data: valores.temperatura,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      }
    });

    this.charts['conductividad'] = new Chart(this.conductividadChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['S/m'],
        datasets: [{
          label: 'Conductividad',
          data: valores.conductividad,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }]
      }
    });

     this.charts['bateria'] = new Chart(this.bateriaChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['%'],
        datasets: [{
          label: 'Bateria',
          data: valores.bateria,
          borderColor: 'rgb(255, 0, 0)',
          tension: 0.1
        }]
      }
    });

    this.charts['nitrogeno'] = new Chart(this.nitrogenoChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['mg/kg'],
        datasets: [{
          label: 'Nitrógeno',
          data: valores.nitrogeno,
          borderColor: 'rgb(255, 206, 86)',
          tension: 0.1
        }]
      }
    });

    this.charts['fosforo'] = new Chart(this.fosforoChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['mg/kg'],
        datasets: [{
          label: 'Fósforo',
          data: valores.fosforo,
          borderColor: 'rgb(153, 102, 255)',
          tension: 0.1
        }]
      }
    });

    this.charts['potasio'] = new Chart(this.potasioChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['mg/kg'],
        datasets: [{
          label: 'Potasio',
          data: valores.potasio,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        }]
      }
    });
  }

  // Método para actualizar los gráficos con los nuevos valores
  updateCharts(valores: any): void {
    this.updateChart('humedad', valores.humedad);
    this.updateChart('temperatura', valores.temperatura);
    this.updateChart('conductividad', valores.conductividad);
    this.updateChart('bateria', valores.bateria); 
    this.updateChart('nitrogeno', valores.nitrogeno);
    this.updateChart('fosforo', valores.fosforo);
    this.updateChart('potasio', valores.potasio);
  }

  updateChart(key: string, nuevoValor: number): void {
    const chart = this.charts[key];
    if (chart) {
      chart.data.labels.push('');
      chart.data.datasets[0].data.push(nuevoValor);
      chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }

}