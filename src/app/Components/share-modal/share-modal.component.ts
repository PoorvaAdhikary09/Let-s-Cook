import { Component, inject, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { Clipboard } from '@angular/cdk/clipboard';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular'; 
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonIcon],
  providers: [Clipboard, ModalController, ToastController]
})
export class ShareModalComponent {

  @Input() url!: string;
  private clipboard = inject(Clipboard);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ closeOutline });
  }

  copyLink() {
    this.clipboard.copy(this.url);
    this.presentToast('Link copied to clipboard');
  }

  async nativeShare() {
    if (navigator.share) {
      await navigator.share({
        title: 'Check this recipe 🍽️',
        url: this.url,
      });
    } else {
      this.presentToast('Sharing not supported on this device');
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  }

}
