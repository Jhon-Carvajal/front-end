import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private idFincaSource = new BehaviorSubject<string>('');
  private idLoteSource = new BehaviorSubject<string>('');
  currentIdFinca = this.idFincaSource.asObservable();
  currentIdLote = this.idLoteSource.asObservable();

  changeIdFinca(idFinca: string) {
    this.idFincaSource.next(idFinca);
    //console.log("Finca seleccionada",idFinca)
  }
  changeIdLote(idLote:string) {
    this.idLoteSource.next(idLote);
    //console.log("lote seleccionado",idLote)
  }
}