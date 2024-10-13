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

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('humedadChart') humedadChart!: ElementRef;
  @ViewChild('temperaturaChart') temperaturaChart!: ElementRef;
  @ViewChild('conductividadChart') conductividadChart!: ElementRef;
  @ViewChild('nitrogenoChart') nitrogenoChart!: ElementRef;
  @ViewChild('fosforoChart') fosforoChart!: ElementRef;
  @ViewChild('potasioChart') potasioChart!: ElementRef;
  @ViewChild('bateriaChart') bateriaChart!: ElementRef;
  @ViewChild('phChart') phChart!: ElementRef;

  charts: { [key: string]: any } = {};
  private subscription!: Subscription; 
  fosforoMensaje: string = '';
  nitrogenoMensaje: string = '';
  potasioMensaje: string = '';
  phMensaje: string = '';
  conductividadValor: any;
  temperaturaValor: any;
  humedadValor: any;
  bateriaValor: any;
  // almacenar historial
  humedadData: number[] = [];
  temperaturaData: number[] = [];
  conductividadData: number[] = [];
  bateriaData: number[] = [];
  phData: number[] = [];
  nitrogenoData: number[] = [];
  fosforoData: number[] = [];
  potasioData: number[] = [];

 
  constructor(  private datos: DispositivoService, 
                private sharedDataService: SharedDataService,) {
              }
  
  ngOnInit(): void {
    // actualización 
 this.datos.datosias().subscribe(
      (historicos: any) => {
        // Recorrer los datos históricos y llenar los arreglos de datos
        historicos.forEach((dato: any) => {
          this.humedadData.push(dato.humedad);
          this.temperaturaData.push(dato.temperatura);
          this.conductividadData.push(dato.conductividad);
          this.bateriaData.push(dato.bateria);
          this.phData.push(dato.ph);
          this.nitrogenoData.push(dato.nitrogeno);
          this.fosforoData.push(dato.fosforo);
          this.potasioData.push(dato.potasio);          
        });

        this.initializeCharts();
      },
      (error) => {
        console.error('Error al obtener datos históricos:', error);
      }
    );

    this.subscription = interval(1000)
      .pipe(switchMap(() => this.datos.datosias()))
      .subscribe(
        (data: any) => {
          const datou = data[data.length - 1];
          if (datou) {
            const valores = {
              humedad: datou.humedad,
              temperatura: datou.temperatura,
              conductividad: datou.conductividad,
              bateria: datou.bateria,
              ph: datou.ph,
              nitrogeno: datou.nitrogeno,
              fosforo: datou.fosforo,
              potasio: datou.potasio
            };
            this.updateCharts(valores);
            this.conductividadValor = valores.conductividad;
            this.bateriaValor = valores.bateria;
            this.humedadValor = valores.humedad;
            this.phMensaje = this.clasificarPh(valores.ph);
            this.temperaturaValor = valores.temperatura;
            this.fosforoMensaje = this.clasificarFosforo(valores.fosforo);
            this.nitrogenoMensaje = this.clasificarNitrogeno(valores.nitrogeno);
            this.potasioMensaje = this.clasificarPotasio(valores.potasio);
          }
        },
        (error) => {
          console.error('Error al obtener los datos actualizados:', error);
        }
      );
  }
 
  // Inicio de gráficos
  ngAfterViewInit(): void {
    if (this.humedadData.length > 0) {
      this.initializeCharts();
    }
  }
   
  initializeCharts(): void {
    this.charts['humedad'] = new Chart(this.humedadChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['%'],
        datasets: [{
          label: 'Humedad',
          data: this.humedadData,
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
          data: this.temperaturaData,
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
          data: this.conductividadData,
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
          data: this.bateriaData,
          borderColor: 'rgb(255, 0, 0)',
          tension: 0.1
        }]
      }
     });
    
    this.charts['ph'] = new Chart(this.phChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'Ph',
          data: this.phData,
          borderColor: 'rgb(255, 206, 86)',
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
          data: this.nitrogenoData,
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
          data: this.fosforoData,
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
          data: this.potasioData,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        }]
      }
    });
  }

  clasificarFosforo(valor: number): string {
  if (valor < 10) {
    return `El valor de fósforo (${valor} mg/kg) Bajo`;
  } else if (valor >=10 && valor<=30) {
    return `El valor de fósforo (${valor} mg/kg) Óptimo`;
  } else if (valor > 30) {
    return `El valor de fósforo (${valor} mg/kg) Alto`;
  } else {
    return `El valor de fósforo (${valor}) no está en el rango esperado.`;
  }
  }
  
   clasificarNitrogeno(valor: number): string {
  if (valor < 2.5) {
    return `Valor de Nitrogeno (${valor} mg/kg) Bajo`;
  } else if (valor >=2.5 && valor<=3.5) {
    return `Valor de Nitrogeno (${valor} mg/kg) Óptimo`;
  } else if (valor > 3.5) {
    return `Valor de Nitrogeno (${valor} mg/kg) Alto`;
  } else {
    return `Valor de Nitrogeno (${valor}) no está en el rango esperado.`;
  }
   }
  
   clasificarPotasio(valor: number): string {
  if (valor < 100) {
    return `Valor de Potasio (${valor} mg/kg) Deficiente`;
  } else if (valor >=100 && valor<=200) {
    return `Valor de Potasio (${valor} mg/kg) Adecuado`;
  } else if (valor > 200) {
    return `Valor de Potasio (${valor} mg/kg) Óptimo`;
  } else {
    return `Valor de Potasio (${valor}) no está en el rango esperado.`;
  }
}

  clasificarPh(valor: number): string {
  if (valor < 7) {
    return `Valor de Ph (${valor} ) Suelo Acido`;
  } else if (valor >=7 && valor<=7.3) {
    return `Valor de Ph (${valor} ) Neutro`;
  } else if (valor > 7.3) {
    return `Valor de Ph (${valor} ) Suelo Alcalino`;
  } else {
    return `Valor de Ph (${valor}) no está en el rango esperado.`;
  }
  }
  
  updateCharts(valores: any): void {
    this.humedadData.push(valores.humedad);
    this.temperaturaData.push(valores.temperatura);
    this.conductividadData.push(valores.conductividad);
    this.bateriaData.push(valores.bateria);
    this.phData.push(valores.ph);
    this.nitrogenoData.push(valores.nitrogeno);
    this.fosforoData.push(valores.fosforo);
    this.potasioData.push(valores.potasio);

    this.updateChart('humedad', this.humedadData);
    this.updateChart('temperatura', this.temperaturaData);
    this.updateChart('conductividad', this.conductividadData);
    this.updateChart('bateria', this.bateriaData);
    this.updateChart('ph', this.phData);
    this.updateChart('nitrogeno', this.nitrogenoData);
    this.updateChart('fosforo', this.fosforoData);
    this.updateChart('potasio', this.potasioData);
  }

  updateChart(key: string, data: number[]): void {
    const chart = this.charts[key];
    if (chart) {
      chart.data.labels.push(''); 
      chart.data.datasets[0].data = data; 
      chart.update();
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }

}