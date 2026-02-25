import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Supabase } from 'src/app/Services/Supabase-Service/supabase';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonContent, IonItem, IonLabel, RouterLink, IonIcon],
})
export class AppMenuComponent {
  private supabase = inject(Supabase);
  userName = '';

  constructor() {
   addIcons({ personCircleOutline, logOutOutline });

    this.supabase.session$.subscribe(session => {
      this.userName = session?.user?.user_metadata?.['name'] ?? '';
    });
  }

  async logout() {
    await this.supabase.logout();
  }
}
