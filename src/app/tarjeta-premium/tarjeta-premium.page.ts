import { EmpresaRecord } from './../interface/empresa.interface';
import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../services/airtable.service';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { MenuService } from '../services/menu.service';
register();

@Component({
  selector: 'app-tarjeta-premium',
  templateUrl: './tarjeta-premium.page.html',
  styleUrls: ['./tarjeta-premium.page.scss'],
})
export class TarjetaPremiumPage implements OnInit {
  nombreUsuario: string = '';
  primernombreUsuario: string = '';
  establecimiento: string = '';
  rut: string = '';
  selectedTab = 'tarjeta-premium';
  backButtonPressedOnce: boolean = false;
  empresas: EmpresaRecord[] = [];
  timestamp: number = 0;

  constructor(
    private airtableService: AirtableService,
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform,
    private toastController: ToastController,
  ) {
    this.obtenerDatosEmpresa();

  }

  ngOnInit() {
    this.getNombreUsuarioAlmacenado();
    this.getIdUsuarioAlmacenado(); // Llama al método para obtener el idUsuario
    this.getRutUsuarioAlmacenado()
    this.menuCtrl.enable(true);
  }
  ionViewWillEnter() {
    // Establecer la opción seleccionada en 'tarjeta'
    this.selectedTab = 'tarjeta-premium';
    this.menuCtrl.enable(true);
    this.registerBackButtonListener();

  }
  ionViewDidEnter() {
    this.menuCtrl.close(); // Cierra el menú al entrar en esta página
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
      if (this.router.url === '/tarjeta-premium') {
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
    this.menuCtrl.open("menu"+this.timestamp); // Reemplaza 'menu-content' con el ID de tu menú si es diferente
  }

  tabChanged() {
    this.router.navigate([this.selectedTab]);
    this.menuCtrl.enable(false);
    this.menuCtrl.enable(true);
  }

  async obtenerDatosEmpresa() {
    this.airtableService.getData('Empresa', 'Activas').then(
      (data: any[]) => {
        this.empresas = data.map((empresaData: any) => {
          return {
            id: empresaData.fields.id,
            activo: empresaData.fields.activo,
            nombre: empresaData.fields.nombre,
            logo: empresaData.fields.logo && empresaData.fields.logo[0]?.thumbnails?.large?.url
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
