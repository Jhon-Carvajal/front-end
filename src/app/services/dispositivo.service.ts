import { Injectable } from '@angular/core';
import { Dispositivo } from '../interfaces/dispositivo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService{
  
  constructor(private http: HttpClient) { }

  datosias(): Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${environment.url_gateway}/datosias`)
  }

  datosia(id: string): Observable<Dispositivo>{
    return this.http.get<Dispositivo>(`${environment.url_gateway}/datosia/${id}`)
    }
    
  eliminardatosia(id:string): Observable<Dispositivo>{
    return this.http.delete<Dispositivo>(`${environment.url_gateway}/datosia/${id}`,)
  }
}