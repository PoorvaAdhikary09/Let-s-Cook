import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppMenuComponent } from './Components/app-menu/app-menu.component';
import { ModalController } from '@ionic/angular/standalone';
import { SignupFormComponent } from './Components/Auth/signup-form/signup-form.component';
import { AuthService } from './Services/Auth-Service/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IonApp, IonRouterOutlet, AppMenuComponent],
})
export class AppComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly authService = inject(AuthService);

  private signupOpened = false;
  private sessionChecked = false;


  constructor() {
     const isLoggedIn = this.authService.isLoggedIn();

      if (!this.sessionChecked) {
        this.sessionChecked = true;

        if (!isLoggedIn) {
          setTimeout(() => this.openSignupOnce(), 3000);
        }
      }
  }

  async openSignupOnce() {
  if (this.signupOpened) return;
  this.signupOpened = true;

  const modal = await this.modalCtrl.create({
    component: SignupFormComponent,
    backdropDismiss: false
  });
  await modal.present();
 }
}
