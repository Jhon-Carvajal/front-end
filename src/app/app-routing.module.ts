import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { autorizacionGuard } from './guards/autorizacion.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', canActivate: [ autorizacionGuard ], loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
  { path: 'register', component: RegisterComponent},
  
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
