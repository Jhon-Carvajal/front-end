import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private idFincaSource = new BehaviorSubject<string>('');
  currentIdFinca = this.idFincaSource.asObservable();

  changeIdFinca(idFinca: string) {
    this.idFincaSource.next(idFinca);
  }
}