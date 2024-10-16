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
  referenciaF: string | null = null;
  private subscription!: Subscription;
  private nitrogeno!: number;
  private fosforo!: number;
  private potasio!: number;

    private sugerencias: string[] = [
    "Los niveles de nitrógeno, fósforo y potasio son bajos.Se recomienda usar un fertilizante completo que contenga estos tres nutrientes esenciales para mejorar el crecimiento de las plantas y asegurar un desarrollo equilibrado.",
    "Los niveles de fósforo y nitrógeno están bajos, por lo que se recomienda un fertilizante que contenga altos niveles de estos dos nutrientes, esenciales para el crecimiento radicular (fósforo) y el desarrollo de hojas (nitrógeno).",
    "El nivel de potasio es adecuado, pero fósforo y nitrógeno están bajos. Usa un fertilizante que contenga solo fósforo y nitrógeno para evitar una sobredosis de potasio, lo cual podría afectar el equilibrio de nutrientes en el suelo.",
    "Los niveles de fósforo y potasio están bajos, pero el nitrógeno es adecuado. Aplica un fertilizante que contenga fósforo y potasio para mejorar el desarrollo de raíces y la resistencia a enfermedades, sin afectar los niveles ya correctos de nitrógeno.",
    "El fósforo es bajo, mientras que los niveles de nitrógeno y potasio están adecuados. Aplica un fertilizante que contenga principalmente fósforo para promover el desarrollo de las raíces y la floración, sin alterar el equilibrio de los otros nutrientes.",
    "El fósforo es bajo y el potasio está alto, por lo que se recomienda un fertilizante solo con fósforo. Esto ayudará a mejorar el crecimiento radicular y la floración sin saturar el suelo con potasio.",
    "Los niveles de nitrógeno están altos, pero fósforo y potasio están bajos. Usa un fertilizante sin nitrógeno para evitar un exceso que podría dañar las plantas, mientras mejoramos la estructura de las raíces y la resistencia del cultivo.",
    "El nivel de nitrógeno es adecuado o alto, por lo que es importante evitar fertilizantes con este nutriente. Usa uno rico en fósforo para fomentar el crecimiento radicular sin generar un exceso de hojas a causa del nitrógeno.",
    "Los niveles de nitrógeno y potasio son adecuados, pero el fósforo está bajo. Aplica un fertilizante que contenga solo fósforo para equilibrar los nutrientes sin afectar los niveles de nitrógeno y potasio.",
    "El fósforo está en niveles adecuados, pero nitrógeno y potasio están bajos. Usa un fertilizante que aumente estos dos nutrientes para fomentar el crecimiento de hojas y fortalecer la planta contra enfermedades.",
    "El nitrógeno está bajo, mientras que los otros nutrientes están en niveles adecuados. Usa un fertilizante con alto contenido de nitrógeno para promover el crecimiento de hojas y tallos fuertes.",
    "El potasio está en niveles adecuados, pero el nitrógeno es bajo. Aplica un fertilizante que solo aumente el nitrógeno para evitar un exceso de potasio, lo cual podría inhibir la absorción de otros nutrientes.",
    "El potasio está bajo, mientras que el nitrógeno y el fósforo están en niveles adecuados. Aplica un fertilizante rico en potasio para mejorar la resistencia de la planta a enfermedades y asegurar una buena calidad de frutos.",
    "No es necesario aplicar fertilizantes en este momento. Los niveles de nitrógeno, fósforo y potasio son óptimos, lo que indica que el suelo está bien equilibrado.",
    "El potasio está en niveles altos, pero los otros nutrientes podrían necesitar ajuste. Usa un fertilizante que no contenga potasio para evitar una sobredosis de este nutriente, que podría inhibir el crecimiento de las plantas.",
    "El nitrógeno está en niveles adecuados, pero el potasio es bajo. Aplica un fertilizante que contenga solo potasio para fortalecer la planta sin afectar la producción excesiva de hojas debido al nitrógeno.",
    "Evita el uso de fertilizantes con nitrógeno, ya que los niveles actuales son adecuados. En su lugar, enfócate en otros nutrientes como fósforo y potasio para equilibrar el suelo.",
    "El suelo tiene suficiente nitrógeno y potasio, pero puede necesitar otros nutrientes. Aplica un fertilizante sin estos dos elementos para evitar saturar el suelo y mantener un equilibrio adecuado.",
    "El fósforo es adecuado, pero el nitrógeno y potasio están bajos. Usa un fertilizante sin fósforo para mejorar el desarrollo foliar y la resistencia sin alterar los niveles de fósforo.",
    "El fósforo está en niveles adecuados, pero el nitrógeno es bajo. Aplica un fertilizante que solo aumente el nitrógeno para asegurar un crecimiento foliar vigoroso sin afectar los niveles ya correctos de fósforo.",
    "Los niveles de fósforo y potasio son adecuados, pero el nitrógeno está bajo. Aplica un fertilizante con nitrógeno para aumentar el crecimiento foliar sin afectar los niveles de los otros nutrientes.",
    "El fósforo está en niveles adecuados, pero el potasio es bajo. Aplica un fertilizante rico en potasio para asegurar la resistencia de las plantas y su capacidad para producir frutos sin alterar el equilibrio del fósforo.",
    "El fósforo está en niveles altos, por lo que se recomienda evitar fertilizantes con este nutriente para prevenir un exceso que podría afectar la absorción de otros nutrientes.",
    "Los niveles de fósforo y potasio están adecuados o altos, por lo que no se necesitan fertilizantes con estos nutrientes. Aplica solo los nutrientes que faltan para mantener un equilibrio óptimo.",
    "El fósforo y el nitrógeno están en niveles adecuados, pero el potasio es bajo. Usa un fertilizante con potasio para fortalecer la planta y aumentar la producción de frutos sin desequilibrar los otros nutrientes.",
    "El fósforo y el nitrógeno están en niveles adecuados o altos, por lo que se recomienda un fertilizante sin estos nutrientes para evitar un exceso. Focalízate en otros nutrientes que puedan faltar.",
    "Los niveles de potasio, fósforo y nitrógeno son muy altos, lo que puede dañar las plantas a largo plazo. Considera utilizar un fertilizante que no contenga estos nutrientes y promueva la absorción de otros elementos para equilibrar el suelo."
    ];
  private referencia: string[] = [
    "NPK 20-10-10 o 17-17-17",
    "NPK 18-46-0 (Fosfato diamónico) o Urea 46-0-0",
    "DAP 18-46-0",
    "NPK 10-20-20",
    "Superfosfato simple (0-20-0) o Fosfato diamónico (DAP)",
    "Superfosfato o Fosfato diamónico (DAP)",
    "Superfosfato y Cloruro de potasio (KCl)",
    "Fosfato monoamónico (MAP)",
    "Superfosfato simple (0-20-0)",
    "NPK 30-0-30",
    "Urea (46-0-0)",
    "Urea (46-0-0)",
    "Cloruro de potasio (KCl)",
    "Manejo estándar,NPK correctos",
    "Urea o Sulfato de amonio",
    "Cloruro de potasio (KCl) o Sulfato de potasio (SOP)",
    "Superfosfato simple o Cloruro de potasio (KCl)",
    "Superfosfato",
    "Urea y Cloruro de potasio (KCl)",
    "Urea (46-0-0)",
    "Urea",
    "Cloruro de potasio (KCl)",
    "Urea o Sulfato de amonio",
    "Urea",
    "Cloruro de potasio (KCl)",
    "Cloruro de potasio (KCl)",
    "fertilizante organicos o de absorcion lenta",
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

      // Verifica si es válido
      if (sugerenciaNumero !== null && sugerenciaNumero >= 0 && sugerenciaNumero < this.sugerencias.length) {
        this.sugerencia = this.sugerencias[sugerenciaNumero];
        this.referenciaF = this.referencia[sugerenciaNumero];
       // console.log('Sugerencia final asignada:', this.sugerencia);
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

