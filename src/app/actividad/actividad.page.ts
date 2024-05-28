import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, MenuController, NavController, Platform } from '@ionic/angular';
import { AirtableService } from '../services/airtable.service';
import { Actividad } from '../interface/actividad.interface';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  selectedTab = 'actividad';
  timestamp: number;
  actividades: Actividad[] = [];

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private platform: Platform,
    private location: Location,
    private airtableService: AirtableService
  ) {
    this.timestamp = Date.now();
  }

  ngOnInit() {
    this.obtenerDatosActividad();
  }

  menuChange() {
  }

  openMenu() {
    this.menuCtrl.open("menu"+this.timestamp);
  }

  ionViewWillEnter() {
    // Establecer la opción seleccionada en 'tarjeta'
    this.selectedTab = 'actividad';

  }
async obtenerDatosActividad() {
  try {
    // Obtener el valor de rutUsuario desde el localStorage
    const rutUsuario = localStorage.getItem('rutUsuario');



    // Obtener todos los datos de la tabla "Actividad"
    const data = await this.airtableService.getData('Actividad');

    // Filtrar los datos basados en el valor de rutUsuario
    this.actividades = data
      .filter((actividadData: any) => actividadData.fields.rut === rutUsuario)
      .map((actividadData: any) => {
        return {
          fecha: actividadData.fields.fecha,
          empresa: actividadData.fields.empresa,
          rut: actividadData.fields.rut,
          foto_boleta: actividadData.fields.foto_boleta,
          descripcion: actividadData.fields.descripcion,
          monto: actividadData.fields.monto,
          revisado: actividadData.fields.revisado,
          empresa_logo: actividadData.fields.empresa_logo && actividadData.fields.empresa_logo[0]?.thumbnails?.large?.url
          ? actividadData.fields.empresa_logo[0].thumbnails.large.url
          : 'assets/frame/nodisponible.png',
        };
      });

    console.log(this.actividades);
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
  }
}



  tabChanged() {
    this.router.navigate([this.selectedTab]);
  }
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.location.back();
    });
  }
}
