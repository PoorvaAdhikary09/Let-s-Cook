import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppMenuComponent } from './Components/app-menu/app-menu.component';
import { ModalController } from '@ionic/angular/standalone';
import { SignupFormComponent } from './Components/Auth/signup-form/signup-form.component';
import { Supabase } from './Services/Supabase-Service/supabase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AppMenuComponent, SignupFormComponent],
})
export class AppComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly supabaseService = inject(Supabase);
  private signupOpened = false;

  constructor() {
     this.supabaseService.session$.subscribe(session => {
    if (!session) {
      setTimeout(() => this.openSignupOnce(), 3000);
    }
  });
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
