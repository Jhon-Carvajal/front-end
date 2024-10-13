import { Component, OnInit, OnDestroy } from '@angular/core';
import { Respuesta } from 'src/app/interfaces/respuesta';
import { DispositivoService } from 'src/app/services/dispositivo.service';
import { SugerirService } from 'src/app/services/iot.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MLComponent implements OnInit, OnDestroy {
  sugerencia: string | null = null;
  private subscription!: Subscription;
  private nitrogeno!: number;
  private fosforo!: number;
  private potasio!: number;

    private sugerencias: string[] = [
    "Aumentar fertilizante en el suelo de nutrientes primarios.",
    "Sugerencia: Usar fertilizantes ricos en fósforo y nitrógeno.",
    "Sugerencia: Usar fertilizantes ricos en fósforo y nitrógeno sin potasio.",
    "Sugerencia: Usar fertilizantes ricos en fósforo y potasio.",
    "Sugerencia: Usar fertilizante rico en fósforo.",
    "Sugerencia: Usar fertilizante rico en fósforo sin potasio.",
    "Sugerencia: Usar fertilizante rico en fósforo y potasio, sin nitrógeno.",
    "Sugerencia: Usar fertilizante rico en fósforo sin nitrógeno.",
    "Sugerencia: Usar fertilizante rico en fósforo sin nitrógeno ni potasio.",
    "Sugerencia: Usar fertilizante rico en nitrógeno y potasio.",
    "Sugerencia: Usar fertilizante rico en nitrógeno.",
    "Sugerencia: Usar fertilizante rico en nitrógeno sin potasio.",
    "Sugerencia: Usar fertilizante rico en potasio.",
    "Sugerencia: Niveles de nutrientes adecuados.",
    "Sugerencia: Usar fertilizante sin potasio.",
    "Sugerencia: Usar fertilizante rico en potasio, sin nitrógeno.",
    "Sugerencia: Usar fertilizante sin nitrógeno.",
    "Sugerencia: Usar fertilizante sin nitrógeno ni potasio.",
    "Sugerencia: Usar fertilizante rico en nitrógeno y potasio sin fósforo.",
    "Sugerencia: Usar fertilizante rico en nitrógeno, sin fósforo.",
    "Sugerencia: Usar fertilizante rico en nitrógeno, sin fósforo ni potasio.",
    "Sugerencia: Usar fertilizante rico en potasio, sin fósforo.",
    "Sugerencia: Usar fertilizante sin fósforo.",
    "Sugerencia: Usar fertilizante sin fósforo ni potasio.",
    "Sugerencia: Usar fertilizante rico en potasio, sin fósforo ni nitrógeno.",
    "Sugerencia: Usar fertilizante sin fósforo ni nitrógeno.",
    "Sugerencia: Usar fertilizante para disminuir potasio, fósforo y nitrógeno."
  ];

  constructor(
    private sugerirService: SugerirService,
    private datos: DispositivoService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.datos.datosias().subscribe(
      (data: any) => {
        const datou = data[data.length - 1];
        if (datou) {
          this.nitrogeno = datou.nitrogeno;
          this.fosforo = datou.fosforo;
          this.potasio = datou.potasio;
        }
        this.obtenerSugerencia();
      },
      (error) => {
        console.error('Error de obtención de los datos:', error);
      }
    );
  }

  obtenerSugerencia() {
  const sugerenciaDatos: number[][] = [[this.fosforo, this.nitrogeno, this.potasio]];
  
  this.sugerirService.crearsug(sugerenciaDatos).subscribe(
    (response: Respuesta) => {
      let sugerenciaNumero: number | null = null;

      if (response.sugerido !== undefined) {
        sugerenciaNumero = response.sugerido;
       // console.log("Sugerencia recibida (sugerido):", sugerenciaNumero);
      } else if (response.sugerencias && Array.isArray(response.sugerencias)) {
        const primeraSugerencia = response.sugerencias[0];
        if (primeraSugerencia) {
          sugerenciaNumero = Number(primeraSugerencia);
         // console.log("Sugerencia alternativa recibida (sugerencias):", sugerenciaNumero);
        }
      } else {
        console.warn('No se encontró ninguna sugerencia válida en la respuesta.');
      }

      // Verifica si sugerenciaNumero es válido
      if (sugerenciaNumero !== null && sugerenciaNumero >= 0 && sugerenciaNumero < this.sugerencias.length) {
        this.sugerencia = this.sugerencias[sugerenciaNumero];
        console.log('Sugerencia final asignada:', this.sugerencia);
      } else {
        console.warn('Número de sugerencia fuera de rango o inválido.');
      }
    },
    error => {
      console.error('Error al obtener sugerencia:', error);
    }
  );
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

