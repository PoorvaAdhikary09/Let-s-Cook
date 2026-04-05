import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon, IonMenuToggle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { appsOutline, fastFoodOutline, gridOutline, homeOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { AlertController, ToastController  } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/Services/Auth-Service/auth-service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonContent, IonItem, IonLabel, RouterLink, IonIcon, IonMenuToggle],
})
export class AppMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly alertCtrl = inject(AlertController)
  private readonly toastCtrl = inject(ToastController)
  userName = '';

  constructor() {
   addIcons({ personCircleOutline, logOutOutline, homeOutline, appsOutline, gridOutline, fastFoodOutline });

    const user = this.authService.getCurrentUser();
    this.userName = user ? user.name : '';

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
          this.authService.logout();
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
