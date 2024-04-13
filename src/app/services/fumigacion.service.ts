import { Injectable } from '@angular/core';
import { Fumigacion } from '../interfaces/fumigacion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FumigacionService{
  
  constructor(private http: HttpClient) { }
  
  listarf(): Observable<Fumigacion[]>{
    return this.http.get<Fumigacion[]>(`${environment.url_gateway}/fumigaciones`)
  }

  getfumigaciones(id: string): Observable<Fumigacion>{
    return this.http.get<Fumigacion>(`${environment.url_gateway}/fumigacion/${id}`)
  }

  Fumigacion(infoFumigacion: Fumigacion): Observable<Fumigacion> {
    return this.http.post<Fumigacion>(`${environment.url_gateway}/fumigacion`, infoFumigacion);
  }
  
  eliminarF(id:string): Observable<Fumigacion>{
    return this.http.delete<Fumigacion>(`${environment.url_gateway}/fumigacion/${id}`,)
  }

  actualizarF(id:string,infoFumigacion:Fumigacion): Observable<Fumigacion>{
    return this.http.put<Fumigacion>(`${environment.url_persona}/fumigacion/${id}`,infoFumigacion)
  }

}
