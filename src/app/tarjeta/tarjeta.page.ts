import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../services/airtable.service';
import { Router } from '@angular/router';
import { EmpresaRecord } from '../interface/empresa.interface';
import { Swiper } from 'swiper';
import { App } from '@capacitor/app';

import { register } from 'swiper/element/bundle';
import { MenuService } from '../services/menu.service';
import {
  MenuController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
register();
@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {
  nombreUsuario: string = '';
  primernombreUsuario: string = '';
  rut: string = '';
  establecimiento: string = '';
  selectedTab = 'tarjeta';
  backButtonPressedOnce: boolean = false;
  empresas: EmpresaRecord[] = [];
  timestamp: number;

  constructor(
    private airtableService: AirtableService,
    private router: Router,
    private menuService: MenuService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.timestamp = Date.now();
  }
  ngOnInit() {
    this.getNombreUsuarioAlmacenado();
    this.getIdUsuarioAlmacenado();
    this.getRutUsuarioAlmacenado();
    this.menuService.setActiveItem('tarjeta');
  }

  ionViewWillEnter() {
    this.selectedTab = 'tarjeta';
    this.obtenerDatosEmpresa();
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
      if (this.router.url === '/tarjeta') {
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

  openMenu() {
    this.menuCtrl.open('menu' + this.timestamp); // Reemplaza 'menu-content' con el ID de tu menú si es diferente
  }
  // Método para cerrar el menú lateral
  closeMenu() {
    this.menuCtrl.close();
  }
  ionViewDidEnter() {
    this.menuCtrl.close(); // Cierra el menú al entrar en esta página
  }

  tabChanged() {
    this.router.navigate([this.selectedTab]);
  }

  async obtenerDatosEmpresa() {
    this.airtableService.getData('Empresa', 'Activas').then(
      (data: any[]) => {
        this.empresas = data.map((empresaData: any) => {
          return {
            id: empresaData.fields.id,
            activo: empresaData.fields.activo,
            nombre: empresaData.fields.nombre,
            logo:
              empresaData.fields.logo &&
              empresaData.fields.logo[0]?.thumbnails?.large?.url
                ? empresaData.fields.logo[0].thumbnails.large.url
                : 'assets/frame/nodisponible.png',
            time: 100,
          };
        });
      },
      (error: any) => {
        console.error('Error al obtener las empresas:', error);
      }
    );
  }

  getNombreUsuarioAlmacenado() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.nombreUsuario = nombreUsuario;
      this.primernombreUsuario = nombreUsuario.split(' ')[0];
    } else {
      // No se encontró el nombre de usuario en el almacenamiento local, manejar el caso según tus necesidades
    }
  }

  getIdUsuarioAlmacenado() {
    const establecimiento = localStorage.getItem('establecimientoNombre');
    if (establecimiento) {
      this.establecimiento = establecimiento;
    } else {
      // No se encontró el idUsuario en el almacenamiento local, manejar el caso según tus necesidades
    }
  }
  getRutUsuarioAlmacenado() {
    const rut = localStorage.getItem('rutUsuario');
    if (rut) {
      this.rut = rut;
    } else {
      // No se encontró el idUsuario en el almacenamiento local, manejar el caso según tus necesidades
    }
  }
}
