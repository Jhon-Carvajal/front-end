import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { FincalComponent } from './fincal/fincal.component';
import { CrearFComponent } from './fincal/crearf/crearf.component';

import { LotelComponent } from './lotel/lotel.component';
import { CrearlComponent } from './lotel/crearl/crearl.component';
import { ActualizarfComponent } from './fincal/actualizarf/actualizarf.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,
    children:
  [ 
    { path: '', component : InicioComponent },
    { path: 'finca',component: FincalComponent },
    { path: 'crear',component:CrearFComponent},
    { path: 'lote',component: LotelComponent},
    { path: 'crear-lote', component:CrearlComponent},
    { path: 'actualizarf/:id', component:ActualizarfComponent},
  ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
