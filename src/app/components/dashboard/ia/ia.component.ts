import { Component, OnInit,OnDestroy,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
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

    this.subscription = interval(5000)
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
            this.bateriaValor = valores.bateria;
            this.phMensaje = this.clasificarPh(valores.ph);
            this.fosforoMensaje = this.clasificarFosforo(valores.fosforo);
            this.nitrogenoMensaje = this.clasificarNitrogeno(valores.nitrogeno);
            this.potasioMensaje = this.clasificarPotasio(valores.potasio);
            this.humedadValor = this.clasificarHumedad(valores.humedad);
            this.temperaturaValor = this.clasificarTemperatura(valores.temperatura);
            this.conductividadValor = this.clasificarConductividad(valores.conductividad);
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
    labels:[''],
    datasets: [{
      label: 'Humedad',
      data: this.humedadData,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }]
  },
  options: {
    scales: {
      x: { title: { display: true, text: 'Tiempo (s)' } },
      y: { title: { display: true, text: 'Porcentaje de humedad (%)' } }
    }
  }
});

    this.charts['temperatura'] = new Chart(this.temperaturaChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'Temperatura',
          data: this.temperaturaData,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'Grados Celcius (°C)' } }
        }
      }
    });

    this.charts['conductividad'] = new Chart(this.conductividadChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['dS/m'],
        datasets: [{
          label: 'Conductividad eléctrica',
          data: this.conductividadData,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'Valor de decisiemens/metro (dS/m)' } }
        }
      }
    });

     this.charts['bateria'] = new Chart(this.bateriaChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['%'],
        datasets: [{
          label: 'Batería',
          data: this.bateriaData,
          borderColor: 'rgb(255, 0, 0)',
          tension: 0.1
        }]
       },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'Porcentaje actual de batería (%)' } }
        }
      }
     });
    
    this.charts['ph'] = new Chart(this.phChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'pH',
          data: this.phData,
          borderColor: 'rgb(255, 206, 86)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'Escala numérica (pH)' } }
        }
      }
    });

    this.charts['nitrogeno'] = new Chart(this.nitrogenoChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'Nitrógeno',
          data: this.nitrogenoData,
          borderColor: 'rgb(255, 206, 86)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'miligramos/kilogramos' } }
        }
      }
    });

    this.charts['fosforo'] = new Chart(this.fosforoChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'Fósforo',
          data: this.fosforoData,
          borderColor: 'rgb(153, 102, 255)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'miligramos/kilogramos' } }
        }
      }
    });

    this.charts['potasio'] = new Chart(this.potasioChart.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: [''],
        datasets: [{
          label: 'Potasio',
          data: this.potasioData,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tiempo (s)' } },
          y: { title: { display: true, text: 'miligramos/kilogramos' } }
        }
      }
    });
  }

  clasificarFosforo(valor: number): string {
  if (valor < 10) {
    return `Fósforo actual: ${valor} mg/kg (Nivel bajo)`;
  } else if (valor >=10 && valor<=30) {
    return `Fósforo actual: ${valor} mg/kg (Nivel adecuado)`;
  } else if (valor > 30) {
    return `Fósforo actual: ${valor} mg/kg (Nivel alto)`;
  } else {
    return ``;
  }
  }
  
  clasificarNitrogeno(valor: number): string {
    if (valor < 2.5) {
      return `Nitrógeno actual: ${valor} mg/kg (Nivel bajo)`;
    } else if (valor >= 2.5 && valor <= 3.5) {
      return `Nitrógeno actual: ${valor} mg/kg (Nivel adecuado)`;
    } else if (valor > 3.5) {
      return `Nitrógeno actual:$ {valor} mg/kg) (Nivel alto)`;
    } else {
      return ``;
    }
  }
  
   clasificarPotasio(valor: number): string {
  if (valor < 100) {
    return `Potasio actual: ${valor} mg/kg (Nivel bajo)`;
  } else if (valor >=100 && valor<=200) {
    return `Potasio actual: ${valor} mg/kg (Nivel adecuado)`;
  } else if (valor > 200) {
    return `Potasio actual: ${valor} mg/kg (Nivel alto)`;
  } else {
    return ``;
  }
}

  clasificarPh(valor: number): string {
  if (valor < 7) {
    return `pH actual: (${valor}: (Suelo ácido)`;
  } else if (valor >=7 && valor<=7.3) {
    return `pH actual: (${valor} (Suelo neutro)`;
  } else if (valor > 7.3) {
    return `pH actual: ${valor} (Suelo alcalino)`;
  } else {
    return ``;
  }
  }

 clasificarHumedad(valor: number): string {
  if (valor < 65) {
    return `Humedad actual: ${valor} % (Humedad baja)`;
  } else if (valor >=65 && valor<=80) {
    return `Humedad actual: ${valor} % (Humedad adecuada)`;
  } else if (valor > 80) {
    return `Humedad actual: ${valor} % (Humedad alta)`;
  } else {
    return ``;
  }
 }
 clasificarTemperatura(valor: number): string {
  if (valor < 18) {
    return `Temperatura actual: ${valor} °C (Temperatura baja)`;
  } else if (valor >=18 && valor<=25) {
    return `Temperatura actual: ${valor} °C (Temperatura adecuada)`;
  } else if (valor > 25) {
    return `Temperatura actual: ${valor} °C (Temperatura alta)`;
  } else {
    return ``;
  }
 }
  clasificarConductividad(valor: number): string {
  if (valor < 0.3) {
    return `Conductividad eléctrica actual: ${valor} dS/m (Condutividad baja)`;
  } else if (valor >=0.3 && valor<=1) {
    return `Conductividad eléctrica actual: ${valor} dS/m (Conductividad adecuada)`;
  } else if (valor > 1) {
    return `Conductividad eléctrica actual: ${valor} dS/m (Conductividad alta)`;
  } else {
    return ``;
  }
  }

  updateCharts(valores: any): void {
  // Agregar los nuevos valores a los datos históricos
  this.humedadData.push(valores.humedad);
  this.temperaturaData.push(valores.temperatura);
  this.conductividadData.push(valores.conductividad);
  this.bateriaData.push(valores.bateria);
  this.phData.push(valores.ph);
  this.nitrogenoData.push(valores.nitrogeno);
  this.fosforoData.push(valores.fosforo);
  this.potasioData.push(valores.potasio);

  // Limitar a los últimos 10 valores
  this.humedadData = this.humedadData.slice(-10);
  this.temperaturaData = this.temperaturaData.slice(-10);
  this.conductividadData = this.conductividadData.slice(-10);
  this.bateriaData = this.bateriaData.slice(-10);
  this.phData = this.phData.slice(-10);
  this.nitrogenoData = this.nitrogenoData.slice(-10);
  this.fosforoData = this.fosforoData.slice(-10);
  this.potasioData = this.potasioData.slice(-10);

  // Actualizar cada gráfico
  this.updateChart('humedad', this.humedadData);
  this.updateChart('temperatura', this.temperaturaData);
  this.updateChart('conductividad', this.conductividadData);
  this.updateChart('bateria', this.bateriaData);
  this.updateChart('ph', this.phData);
  this.updateChart('nitrogeno', this.nitrogenoData);
  this.updateChart('fosforo', this.fosforoData);
  this.updateChart('potasio', this.potasioData);
}

  updateChart(chartKey: string, data: number[]): void {
  if (this.charts[chartKey]) {
    this.charts[chartKey].data.datasets[0].data = data; 
    this.charts[chartKey].data.labels = Array.from({ length: data.length }, (_, i) => `${i * 20}s`);
    this.charts[chartKey].update(); 
  }
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }

}