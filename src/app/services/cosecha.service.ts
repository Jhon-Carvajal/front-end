import { Injectable } from '@angular/core';
import { Cosecha } from '../interfaces/cosecha';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CosechaService{
  
  constructor(private http: HttpClient) { }

  listarC(): Observable<Cosecha[]>{
    return this.http.get<Cosecha[]>(`${environment.url_gateway}/cosechas`)
  }

  getcosecha(id: string): Observable<Cosecha>{
    return this.http.get<Cosecha>(`${environment.url_gateway}/cosecha/${id}`)
  }
  Cosechas(infocosecha: Cosecha): Observable<Cosecha> {
    return this.http.post<Cosecha>(`${environment.url_gateway}/cosecha`, infocosecha);
  }
  
  eliminarCosecha(id:string): Observable<Cosecha>{
    return this.http.delete<Cosecha>(`${environment.url_gateway}/cosecha/${id}`,)
  }

  actualizarCosecha(id:string,infocosecha:Cosecha): Observable<Cosecha>{
    return this.http.put<Cosecha>(`${environment.url_persona}/cosecha/${id}`,infocosecha)
  }
}