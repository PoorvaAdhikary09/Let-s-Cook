import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonButton, IonInput, IonButtons, IonIcon, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { closeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Supabase } from 'src/app/Services/Supabase-Service/supabase';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  imports: [ReactiveFormsModule, IonContent, IonButton, IonInput, IonButtons, IonIcon, IonToolbar, IonTitle],
})
export class SignupFormComponent  implements OnInit {

  private fb = new FormBuilder();
  private modalCtrl= inject(ModalController);
  private toastCtrl: ToastController = inject(ToastController);
  private supabaseService = inject(Supabase);

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

    const user = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    const { data, error } = await this.supabaseService.signUp(
      user.name!,
      user.email!,
      user.password!
  );

  if (error) {
    console.error(error.message);
    const toast = await this.toastCtrl.create({
      message: 'Signup failed. Please try again.',
      duration: 3000,
    });
    await toast.present();
    return;
  }
    this.modalCtrl.dismiss(user, 'success');
    this.onLogin();
  }

  async onLogin(){
    const modalCtrl = await this.modalCtrl.create({
      component: LoginFormComponent,
      backdropDismiss: true,
    });
    return await modalCtrl.present();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
