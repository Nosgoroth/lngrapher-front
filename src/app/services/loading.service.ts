import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private activeLoader: HTMLIonLoadingElement = null;

  constructor(
    public loadingController: LoadingController
  ) { }

  public async load(message?: string): Promise<HTMLIonLoadingElement> {
    if (this.activeLoader) {
      await this.dismiss();
    }

    const loader = await this.loadingController.create({
      message,
      duration: 10000,
      translucent: true,
    });

    this.setActiveLoader(loader);
    loader.onDidDismiss().then(x => {
      this.unsetActiveLoader(loader);
    });

    await loader.present();

    return loader;
  }

  public async dismiss(data?: any): Promise<boolean> {
    if (!this.activeLoader) {
      return;
    }
    return await this.activeLoader.dismiss(data);
  }



  private setActiveLoader(loader: HTMLIonLoadingElement) {
    this.activeLoader = loader;
  }

  private unsetActiveLoader(loader: HTMLIonLoadingElement) {
    if (this.activeLoader === loader) {
      this.activeLoader = null;
    }
  }
}
