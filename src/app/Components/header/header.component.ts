import { Component } from '@angular/core';
import { IonToolbar, IonHeader, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {shareSocialOutline} from 'ionicons/icons'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonHeader, IonTitle, IonAvatar, IonIcon, IonButtons, IonButton],
})
export class HeaderComponent {

  constructor() { 
      addIcons({ shareSocialOutline });
  }

  onShare(){
    alert('shared button clicked')
  }
}
