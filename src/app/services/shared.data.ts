import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private nuevoID!: string;

  setID(id: string) {
    this.nuevoID = id;
  }

  getID(): string {
    return this.nuevoID;
  }
}
