import { Injectable } from '@angular/core';
import { Nutricion } from '../interfaces/plan_nutricion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NutricionService{
  
constructor(private http: HttpClient) { }
    
  listarN(): Observable<Nutricion[]>{
    return this.http.get<Nutricion[]>(`${environment.url_gateway}/nutriciones`)
  }  

  Nutricion(infoNutricion: Nutricion): Observable<Nutricion> {
    return this.http.post<Nutricion>(`${environment.url_gateway}/nutricion`, infoNutricion);
  }
  
  getnutricion(id: string): Observable<Nutricion>{
    return this.http.get<Nutricion>(`${environment.url_gateway}/nutricion/${id}`)
  }  
    
  eliminarNutricion(id:string): Observable<Nutricion>{
    return this.http.delete<Nutricion>(`${environment.url_gateway}/nutricion/${id}`,)
  }
}