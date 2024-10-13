import { Injectable } from '@angular/core';
import { Sugerir } from '../interfaces/sugerir';
import { Respuesta } from '../interfaces/respuesta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SugerirService{
  
  constructor(private http: HttpClient) { }
  crearsug(valoresPNK: number[][]): Observable<Respuesta> {
   // console.log(valoresPNK)
    return this.http.post<Respuesta>(`${environment.url_gateway}/sugerenciam`, valoresPNK );
  }
  
}