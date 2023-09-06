import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  

  constructor(private http: HttpClient) { }

  listar(): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${environment.url_gateway}/personas`)

  }

  getPersona(id: string): Observable<Persona>{
    return this.http.get<Persona>(`${environment.url_persona}/personas/${id}`)
  }
  usuario(infoPersona: Persona) {
    return this.http.post<Persona>(`${environment.url_persona}/personas`,infoPersona);
    }
}
