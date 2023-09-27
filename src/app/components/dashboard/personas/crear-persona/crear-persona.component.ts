import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/interfaces/cargo';
import { Formacion } from 'src/app/interfaces/formacion';
import { Caras, Forma, Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';




@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent {

  imagenCargada: any = null;

  modeli: Caras = {
    cargo_aspirado: '',
    experiencia: '',
    Hdv: ''
  }

  modelo: Forma = {
    estudios: '',
    estado: ''
  }

  loginData = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    estado_civil: '',
    fecha_registro: new Date().toISOString(),
  }

  estadoc: any[] = ['Soltero', 'Soltera', 'Casado', 'Casada', 'Union Libre']
  estudio: any[] = ['Bachiller', 'Tecnico', 'Tecnologo', 'Profesional', 'Curso Basico']
  estado: any[] = ['Terminado', 'En Curso']
  cargo: any[] = ['Asesor', 'Mecanico', 'Administrador', 'Oficios Varios']
  experiencia: any[] = ['06 Meses', '1 Año', '2 Años', 'Mas']

  form!: FormGroup;
  archivos: File[] = [];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private miServicio: PersonaService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      cargo_aspirado: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      estudios: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fecha_registro: new Date().toISOString(),
      id_usuario: JSON.parse(localStorage.getItem('sesion') || '{}')._id || '[SIN ID]',
      curriculum: ['', [Validators.required, this.validadorArchivo(3 * 1024 * 1024)]]
    });
  };

  validadorArchivo(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const archivo = control.value;
      const esDemasiadoGrande = archivo && archivo.size > maxSize;
      return esDemasiadoGrande ? { 'tamanoArchivo': { value: control.value } } : null;
    };
  };

  guardar() {
    this.miServicio.usuario(this.form.value).subscribe({
      next: (data: any) => {
        this.mensaje();
        this.router.navigate(['/dashboard/postulados'])
      },
      error: err => {
        this.error();
      },
      complete() {

      },
    })
  };

  mensaje() {
    setTimeout(() => {
      this._snackBar.open('Usuario guardado', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }, 1500);
  }


  capturarFile(event: any) {
    let base64 = ""
    const archivoCapturado = event.target.files[0];
    
    const documento = new FileReader();
    documento.readAsDataURL(archivoCapturado);

    // Verificar si el archivo es un PDF antes de agregarlo.
    if (archivoCapturado.type !== 'application/pdf') {
      return;
    }

    documento.onload = () => {
      base64 = (documento.result as string).split(',')[1]
      console.log(base64);
      this.form.get('curriculum')?.setValue(base64);
    }
  }

  error() {
    this._snackBar.open('No se pudo guardar el usuario', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenCargada = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

