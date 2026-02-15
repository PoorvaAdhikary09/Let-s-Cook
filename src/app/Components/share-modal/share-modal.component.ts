import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonInput } from "@ionic/angular/standalone";
import { Clipboard } from '@angular/cdk/clipboard';
import { ModalController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular'; 
import { addIcons } from 'ionicons';
import { closeOutline, linkOutline, logoFacebook, logoWhatsapp } from 'ionicons/icons';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonInput],
  providers: [Clipboard, ModalController, ToastController]
})
export class ShareModalComponent {
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ closeOutline, logoFacebook, logoWhatsapp, linkOutline });
  }

  url = "https://let-s-cook-six.vercel.app/";

  shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`,
      '_blank'
    );
  }

  shareTelegram() {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(this.url)}&text=Check%20out%20this%20recipe!`,
      '_blank'
    );
  }

  shareWhatsapp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(this.url)}`,
      '_blank'
    );
  }

  copyLink() {
    navigator.clipboard.writeText(this.url).then(() => {
      this.presentToast('Link copied to clipboard!');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,  
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

   close() {
    this.modalCtrl.dismiss();
  }

}
