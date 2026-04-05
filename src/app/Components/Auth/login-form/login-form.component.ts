import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/Services/Auth-Service/auth-service';

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
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor() { }

  async onLogin() {
  if (this.loginForm.invalid) return;

  const email = this.loginForm.value.email!;
  const password = this.loginForm.value.password!;

  const { data, error } = await this.authService.login(email, password);

  if (error) {
    const toast = await this.toastCtrl.create({
      message: 'Login failed. Please check your credentials.',
      duration: 3000,
      cssClass: 'my-red-toast'
    });
    await toast.present();
    this.loginForm.reset();
    return;
  }

  this.modalCtrl.dismiss(data, 'success');

  const toast = await this.toastCtrl.create({
    message: 'Login successful!',
    duration: 3000,
    cssClass: 'my-green-toast'
  });
  await toast.present();
}

  ngOnInit() {}

}
