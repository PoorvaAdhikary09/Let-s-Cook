import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NgHttpLoaderComponent } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader';
import { HeaderComponent } from "./Components/header/header.component";
import { FooterComponent } from "./Components/footer/footer.component";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, NgHttpLoaderComponent, HeaderComponent, FooterComponent],
})
export class AppComponent {
  public spinkit = Spinkit;
  constructor() {}
}
