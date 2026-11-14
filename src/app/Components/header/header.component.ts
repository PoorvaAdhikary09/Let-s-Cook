import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { IonToolbar, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton, IonBackButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {enterOutline, fingerPrintOutline, menuOutline, shareSocialOutline} from 'ionicons/icons'
import { ModalController } from '@ionic/angular/standalone';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { SignupFormComponent } from '../Auth/signup-form/signup-form.component';
import { MenuController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/Services/Auth-Service/auth-service';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton, IonBackButton],
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [ModalController]
})
export class HeaderComponent {
  private modalController = inject(ModalController)
  private menuCtrl = inject(MenuController);
  private readonly authService = inject(AuthService);

  isLoggedIn = false;
  userName: string | null = null;

  constructor() { 
    addIcons({ shareSocialOutline,enterOutline, menuOutline, fingerPrintOutline });

    this.authService.authState$.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;

    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.userName = user?.name ?? null;
   });
 }

  async onShare(){
    const modal = await this.modalController.create({
      component: ShareModalComponent,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      backdropDismiss: true,
    });
    return await modal.present();
  }

  async signUp(){
    const modal = await this.modalController.create({
      component: SignupFormComponent,
      backdropDismiss: false,
    });
    return await modal.present();
  }

  openMenu(){
    this.menuCtrl.open();
  }
}
