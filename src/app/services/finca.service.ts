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
    return this.http.get<Finca[]>(`${environment.url_gateway}/fincas`)
  }

  getfincas(id: string): Observable<Finca>{
    return this.http.get<Finca>(`${environment.url_gateway}/finca/${id}`)
  }
  Finca(infoFinca: Finca): Observable<Finca> {
    return this.http.post<Finca>(`${environment.url_gateway}/finca`, infoFinca);
  }
  
  eliminarFinca(id:string): Observable<Finca>{
    return this.http.delete<Finca>(`${environment.url_gateway}/finca/${id}`,)
  }

  actualizarFinca(id:string,infoFinca:Finca): Observable<Finca>{
    return this.http.put<Finca>(`${environment.url_persona}/finca/${id}`,infoFinca)
  }
}