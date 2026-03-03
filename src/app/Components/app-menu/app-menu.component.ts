import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon, IonMenuToggle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { appsOutline, fastFoodOutline, gridOutline, homeOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Supabase } from 'src/app/Services/Supabase-Service/supabase';
import { AlertController, ToastController  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonContent, IonItem, IonLabel, RouterLink, IonIcon, IonMenuToggle],
})
export class AppMenuComponent {
  private supabase = inject(Supabase);
  private readonly alertCtrl = inject(AlertController)
  private readonly toastCtrl = inject(ToastController)
  userName = '';

  constructor() {
   addIcons({ personCircleOutline, logOutOutline, homeOutline, appsOutline, gridOutline, fastFoodOutline });

    this.supabase.session$.subscribe(session => {
      this.userName = session?.user?.user_metadata?.['name'] ?? '';
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
    header: 'Confirm Logout',
    message: 'Do you really want to log out?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Logout',
        role: 'destructive',
        handler: async () => {
          await this.supabase.logout();
          await this.presentToast()
        }
      }
    ]
  });
  await alert.present() 
  }

  async presentToast(){
    const toast = await this.toastCtrl.create({
      message:"Logged Out Successfully",
      duration:3000,
      cssClass:"my-green-toast"
    })
    await toast.present()
  }
}
