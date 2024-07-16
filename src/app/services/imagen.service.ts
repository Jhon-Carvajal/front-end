import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from '../interfaces/imagen'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FincaService{
  
  constructor(private http: HttpClient) { }

 subirImagen(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(`${environment.url_gateway}/crearimagen`, formData);
  }
}