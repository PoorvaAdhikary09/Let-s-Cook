import { Component, inject } from '@angular/core';
import { IonToolbar, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton, IonBackButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {shareSocialOutline} from 'ionicons/icons'
import { ModalController } from '@ionic/angular';
import { ShareModalComponent } from '../share-modal/share-modal.component';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton, IonBackButton],
  providers: [ModalController]
})
export class HeaderComponent {
  private modalController = inject(ModalController)

  constructor() { 
      addIcons({ shareSocialOutline });
  }

  async onShare(){
    const modal = await this.modalController.create({
      component: ShareModalComponent,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
    });
    return await modal.present();
  }
}
