import { Component, OnInit, Input } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {

  @Input() prefersBackAction = false;

  canGoBack = false;

  constructor(
    private routerOutlet: IonRouterOutlet,
  ) { }

  get shouldDisplayNotificationCount(): boolean {
    return !!(this.notificationCount && this.notificationCount > 0);
  }

  get shouldShowBackButton(): boolean {
    return !!(this.prefersBackAction && this.canGoBack);
  }
  get notificationCount(): number {
    return 0;
  }

  ngOnInit() {
    this.canGoBack = (this.routerOutlet && this.routerOutlet.canGoBack());
  }

}
