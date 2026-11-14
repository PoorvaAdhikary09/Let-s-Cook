import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonButton, IonInput, IonButtons, IonIcon, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { closeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth-Service/auth-service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, IonContent, IonButton, IonInput, IonButtons, IonIcon, IonToolbar, IonTitle],
})
export class SignupFormComponent  implements OnInit {

  private fb = new FormBuilder();
  private modalCtrl= inject(ModalController);
  private toastCtrl: ToastController = inject(ToastController);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
});

  constructor() { 
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {}

   async onSignup() {
    if (this.signupForm.invalid) return;

    const name = this.signupForm.value.username!;
    const email = this.signupForm.value.email!;
    const password = this.signupForm.value.password!;

    const { data, error } = await this.authService.signup(
      name,
      email,
      password
    );

    if (error) {
      const toast = await this.toastCtrl.create({
        message: error.message || 'Signup failed. Please try again.',
        duration: 3000,
        cssClass: 'my-red-toast'
      });
      await toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: 'Signup successful!',
      duration: 3000,
      cssClass: 'my-green-toast'
    });
    await toast.present();

    this.modalCtrl.dismiss(data, 'success');

    // Open login modal after signup
    this.onLogin();
  }

  async onLogin(){
    const modalCtrl = await this.modalCtrl.create({
      component: LoginFormComponent,
      backdropDismiss: false,
    });
    return await modalCtrl.present();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    // this.router.navigate(['/']);
  }
}
