import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonFooter, IonToolbar, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IonFooter, IonToolbar, IonText],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
