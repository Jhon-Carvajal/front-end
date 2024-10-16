import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private idFincaSource = new BehaviorSubject<string>('');
  private idLoteSource = new BehaviorSubject<string>('');
  private idfum = new BehaviorSubject<string>('');
  private idnut = new BehaviorSubject<string>('');
  private idco = new BehaviorSubject<string>('');
 
  currentIdFinca = this.idFincaSource.asObservable();
  currentIdLote = this.idLoteSource.asObservable();
  currentIdfum = this.idfum.asObservable();
  currentIdnut = this.idnut.asObservable();
  currentIdco = this.idco.asObservable();
  

  changeIdFinca(idFinca: string) {
    this.idFincaSource.next(idFinca);
    //console.log("Finca seleccionada",idFinca)
  }
  changeIdLote(idLote:string) {
    this.idLoteSource.next(idLote);
    //console.log("lote seleccionado",idLote)
  }
}