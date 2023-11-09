import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AngularFireModule } from '@angular/fire/compat'
import { ToastrModule } from 'ngx-toastr';

//Components
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { RecuperarPComponent } from './components/login/recuperar-p/recuperar-p.component';
import { VerificarCComponent } from './components/login/verificar-c/verificar-c.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecuperarPComponent,
    VerificarCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }