import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthStatus } from './interfaces/authenticacion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto NPK';

  private loginService = inject(UserService);
  private router = inject(Router);


  public finishAuthenticationChecking = computed<boolean>(() => {
    if (this.loginService.authStatus() === AuthStatus.checking) {
      return false;
    };

    return true;
  });


  public authenticationStatusChangeEffect = effect(() => {
    switch (this.loginService.authStatus()) {
      case AuthStatus.checking:
        break;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('dashboard');
        break;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('login');
        break;
    };
  });
}
