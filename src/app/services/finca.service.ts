import { Injectable } from '@angular/core';
import { Finca } from '../interfaces/finca';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FincaService{
  
  constructor(private http: HttpClient) { }

  listar(): Observable<Finca[]>{
    return this.http.get<Finca[]>(`${environment.url_gateway}/usuarios`)
  }

  getfincas(id: string): Observable<Finca>{
    return this.http.get<Finca>(`${environment.url_gateway}/usuario/${id}`)
  }
  
  eliminarFinca(id:string): Observable<Finca>{
    return this.http.delete<Finca>(`${environment.url_gateway}/usuario/${id}`,)
  }

  actualizarFinca(id:string,infoFinca:Finca): Observable<Finca>{
    return this.http.put<Finca>(`${environment.url_persona}/usuario/${id}`,infoFinca)
  }
}