import { Injectable } from '@angular/core';
import { Lote } from '../interfaces/lote';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoteService{
  
  constructor(private http: HttpClient) { }

  listarl(): Observable<Lote[]>{
    return this.http.get<Lote[]>(`${environment.url_gateway}/lotes`)
  }

  getlotes(id: string): Observable<Lote>{
    return this.http.get<Lote>(`${environment.url_gateway}/lote/${id}`)
  }

  lote(infoLote: Lote) {
    return this.http.post<Lote>(`${environment.url_gateway}/lote/`,infoLote);
    }

  actualizarl(id: string, infoLote: Lote ){
    return this.http.put(`${environment.url_persona}/lote/${id}`, infoLote);
  }
  
  eliminarl(id:string): Observable<Lote>{
    return this.http.delete<Lote>(`${environment.url_persona}/lote/${id}`)
  }
}