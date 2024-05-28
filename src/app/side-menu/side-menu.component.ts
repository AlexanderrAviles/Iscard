import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { MenuService } from '../services/menu.service';
import { IonMenu } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  activeItem: string = '';
  tipoUsuario: string | null = null;
  versionNumber: string = '';

  constructor(private router: Router,
    private navCtrl: NavController,
    private menuService: MenuService,
    private menuCtrl: MenuController,
    private menu: IonMenu
  ) {
  }

  cerrarMenu() {
    this.menu.close();
  }

  getAppVersion() {
    App.getInfo().then((appInfo) => {
      this.versionNumber = appInfo.version;
      console.log('Número de versión:', this.versionNumber);
      // Puedes utilizar versionNumber como necesites en tu aplicación
    }).catch((error) => {
      console.error('Error al obtener la versión:', error);
    });
  }


  ngOnInit() {
    this.menuService.activeItem$.subscribe(itemName => {
      this.activeItem = itemName;
    });
    this.tipoUsuario = localStorage.getItem('tipoUsuario');
    this.getAppVersion()

  }


  isActive(routePath: string): boolean {
    // Comprueba si la URL actual coincide con la ruta base o con la versión "premium" de la ruta
    return this.router.isActive(routePath, false) || this.router.isActive(routePath + '-premium', false);
  }


  redirectToPage(page: string) {
    // Modifica la redirección en función del tipo de usuario
    if (this.tipoUsuario === 'VIP') {
      // Redirige a las páginas con "-premium" para usuarios VIP
      this.navCtrl.navigateForward(`${page}-premium`);
    } else {
      // Redirige a las páginas estándar para usuarios normales
      this.navCtrl.navigateForward(page);
    }

  }

  cerrarSesion() {
    // Elimina la contraseña del usuario del localStorage
    localStorage.removeItem('contrasenaUsuario');
    localStorage.removeItem('rutUsuario');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('establecimientoNombre');
    localStorage.removeItem('contrasenaUsuario');
    // Redirige a la página de inicio ('/home')
    this.navCtrl.navigateRoot('/home');
  }

  getImagenUrl(): string {
    if (this.tipoUsuario === 'VIP') {
      return '../../assets/frame/iscardTarjetaVIP.png';
    } else {
      return '../../assets/frame/iscardTarjeta.png';
    }
  }

}
