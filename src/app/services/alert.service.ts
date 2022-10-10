import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
  ) { }


  alert(message: string, header?: string, okLabel?: string): Promise<void> {
    return new Promise(async resolve => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text: okLabel ? okLabel : 'OK',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      await alert.present();
    });
  }

  confirm(message: string, header?: string, okLabel?: string, cancelLabel?: string): Promise<boolean> {
    return new Promise(async resolve => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        buttons: [
          {
            text: cancelLabel ? cancelLabel : 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(false);
            }
          }, {
            text: okLabel ? okLabel : 'OK',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  prompt(message: string, inputs: Array<AlertInput>, header?: string): Promise<any> {
    return new Promise(async resolve => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        inputs,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(null);
            }
          }, {
            text: 'OK',
            handler: (value: any) => {
              resolve(value);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async promptString(message: string, header?: string, placeholder?: string, value?: string): Promise<string> {
    const retval = await this.prompt(message, [{
      type: 'text',
      name: 'field',
      value,
      placeholder,
    }], header);
    return retval ? retval.field : null;
  }

  async promptTextarea(message: string, header?: string, placeholder?: string, value?: string): Promise<string> {
    const retval = await this.prompt(message, [{
      type: 'textarea',
      name: 'field',
      value,
      placeholder,
    }], header);
    return retval ? retval.field : null;
  }

  async promptTime(message: string, header?: string): Promise<string> {
    const retval = await this.prompt(message, [{
      type: 'time',
      name: 'field',
    }], header);
    return retval ? retval.field : null;
  }


  async presentActionSheet(buttons: Array<any>, header?: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role;
  }

  async actionSheetOptions(options: { [key: string]: string }, header?: string): Promise<string> {
    let selected: string = null;
    const buttons = Object.keys(options).map(optionkey => ({
      text: options[optionkey],
      handler: () => {
        selected = optionkey;
      }
    }));
    await this.presentActionSheet(buttons, header);
    return selected;
  }

  async promptForNewPassword(message: string, header?: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Contraseña',
          },
          {
            name: 'password_repeat',
            type: 'password',
            placeholder: 'Repetir contraseña',
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              reject();
            }
          }, {
            text: 'OK',
            handler: async (data) => {
              // console.log(data);
              if (!data.password) {
                this.alert('Has de introducir una contraseña.');
                return false;
              }
              if (data.password !== data.password_repeat) {
                this.alert('Las contraseñas no son iguales.');
                return false;
              }
              resolve(data.password);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}
