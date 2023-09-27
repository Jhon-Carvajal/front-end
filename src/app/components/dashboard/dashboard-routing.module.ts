import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { TablafincaComponent } from './tablafinca/tablafinca.component';
import { CrearFincaComponent } from './crear-finca/crear-finca.component';
import { TLotesComponent } from './t-lotes/t-lotes.component';
import { CrearLoteComponent } from './crear-lote/crear-lote.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,
    children:
  [ 
    { path: '', component : InicioComponent },
    { path: 'finca',component: TablafincaComponent },
    { path: 'crear',component:CrearFincaComponent},
    { path: 'lote',component: TLotesComponent},
    { path: 'crear-lote', component:CrearLoteComponent}

  ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
