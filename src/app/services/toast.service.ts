import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async showMessage(message: string, header?: string): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      header,
      message,
      duration: 5000,
      translucent: true,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    await toast.present();
    return toast;
  }

  async showError(errorMessage?: string, innerError?: string): Promise<HTMLIonToastElement> {
    errorMessage = errorMessage ? errorMessage : 'Ocurrió un error.';
    if (innerError && environment.showInnerErrors) {
      innerError = (innerError as any).message ? (innerError as any).message : innerError;
      errorMessage += '\n' + innerError;
    }
    const toast = await this.toastController.create({
      header: 'Error',
      message: errorMessage,
      duration: 5000,
      translucent: true,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    await toast.present();
    return toast;
  }
}
