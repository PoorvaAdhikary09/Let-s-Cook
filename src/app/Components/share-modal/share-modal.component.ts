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
  if (navigator.clipboard) {
    navigator.clipboard.writeText(this.url).then(() => {
      this.presentToast('Link copied!');
    });
  } else {
    // last-resort fallback
    const input = document.createElement('input');
    input.value = this.url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.presentToast('Link copied!');
  }
  }

  async nativeShare() {
    const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: 'Let’s Cook 🍳',
      text: 'Check out this recipe!',
      url,
    }).catch(() => {
      // user cancelled – ignore
    });
  } else {
    this.copyLink();
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
