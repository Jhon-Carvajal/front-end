import { Injectable } from '@angular/core';
import { Cafe } from '../interfaces/cafe';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CafeService{
  
  constructor(private http: HttpClient) { }

  listarc(): Observable<Cafe[]>{
    return this.http.get<Cafe[]>(`${environment.url_gateway}/cafes`)
  }

  getcafe(id: string): Observable<Cafe>{
    return this.http.get<Cafe>(`${environment.url_gateway}/cafe/${id}`)
  }
  Cafe(infoCafe: Cafe): Observable<Cafe> {
    return this.http.post<Cafe>(`${environment.url_gateway}/cafe`, infoCafe);
  }
  
  eliminarCafe(id:string): Observable<Cafe>{
    return this.http.delete<Cafe>(`${environment.url_gateway}/cafe/${id}`,)
  }

  actualizarCafe(id:string,infoCafe:Cafe): Observable<Cafe>{
    return this.http.put<Cafe>(`${environment.url_persona}/cafe/${id}`,infoCafe)
  }
}