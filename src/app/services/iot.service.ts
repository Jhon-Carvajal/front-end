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

  listar(): Observable<Dispositivo[]>{
    return this.http.get<Dispositivo[]>(`${environment.url_gateway}/dispositivos`)
  }

  getdispo(id: string): Observable<Dispositivo>{
    return this.http.get<Dispositivo>(`${environment.url_gateway}/dispositivo/${id}`)
  }
  creardis(valores: Dispositivo): Observable<Dispositivo> {
    return this.http.post<Dispositivo>(`${environment.url_gateway}/dispositivo`, valores );
  }
  
  eliminardispo(id:string): Observable<Dispositivo>{
    return this.http.delete<Dispositivo>(`${environment.url_gateway}/dispositivo/${id}`,)
    }
}