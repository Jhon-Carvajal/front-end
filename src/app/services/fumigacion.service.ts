import { Injectable } from '@angular/core';
import { Fumigacion } from '../interfaces/plan_fumigacion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FumigacionService{
  
  constructor(private http: HttpClient) { }

  listarF(): Observable<Fumigacion[]>{
    return this.http.get<Fumigacion[]>(`${environment.url_gateway}/fumigaciones`)
  }

  Fumigacion(infoFumigacion: Fumigacion): Observable<Fumigacion> {
    return this.http.post<Fumigacion>(`${environment.url_gateway}/fumigacion`, infoFumigacion);
  }
  
  getfumigacion(id: string): Observable<Fumigacion>{
    return this.http.get<Fumigacion>(`${environment.url_gateway}/fumigacion/${id}`)
  }  
    
  eliminarFumigacion(id:string): Observable<Fumigacion>{
    return this.http.delete<Fumigacion>(`${environment.url_gateway}/fumigacion/${id}`,)
  }
}