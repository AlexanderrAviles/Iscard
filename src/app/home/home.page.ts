import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  backButtonPressedOnce: boolean = false;

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private router: Router,
  ) { }


  ionViewDidEnter() {
    this.registerBackButtonListener();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Presione nuevamente para salir',
      duration: 2000,
      position: 'bottom',
      color: 'dark',
    });
    toast.present();
  }
  registerBackButtonListener() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url === '/home') {
        if (this.backButtonPressedOnce) {
          App['exitApp'](); // Cierra la aplicación
        } else {
          this.presentToast();
          this.backButtonPressedOnce = true;
          setTimeout(() => {
            this.backButtonPressedOnce = false;
          }, 2000);
        }
      }
    });
  }
}
