import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { Supabase } from 'src/app/Services/Supabase-Service/supabase';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonContent, IonInput, IonButton,ReactiveFormsModule],
})
export class LoginFormComponent  implements OnInit {

  private fb : FormBuilder = inject(FormBuilder);
  private modalCtrl: ModalController = inject(ModalController)
  private toastCtrl: ToastController = inject(ToastController);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  private supabaseService = inject(Supabase);

  constructor() { }

  async onLogin() {
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };


    const { data, error } = await this.supabaseService.signIn(
      credentials.email!,
      credentials.password!
    );

    if (error) {
      console.error(error.message);
      const toast = await this.toastCtrl.create({
        message: 'Login failed. Please check your credentials.',
        duration: 3000,
        cssClass: 'my-red-toast'
      });
      await toast.present();
      return;
    }

    this.modalCtrl.dismiss(data, 'success');
  }

  ngOnInit() {}

}
