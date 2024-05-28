import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirtableService } from '../services/airtable.service';
import { ToastService } from '../toast/toast.service';

import {
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {
  usuario: string = '';
  idUsuario: string = '';
  contrasena: string = '';
  loggedIn: boolean = false;
  nombreUsuario: string = '';
  primerNombre: string = '';
  mostrarContrasena: boolean = false;
  fingerprintAvailable: boolean = false;
  backButtonPressedOnce: boolean = false;

  constructor(
    private router: Router,
    private airtableService: AirtableService,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform
  ) {}

  ngOnInit() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.loggedIn = true;
      this.nombreUsuario = nombreUsuario;
      this.primerNombre = this.extractPrimerNombre(nombreUsuario);
    }
  }
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

  async login() {
    if (this.loggedIn) {
      let loading = null; // Declara la variable fuera del bloque try-catch
      try {
        loading = await this.loadingController.create({
          message: 'Iniciando Sesión...', // Mensaje del ProgressDialog
        });
        await loading.present();

        // Realiza la consulta a Airtable para obtener datos actualizados del usuario
        const usuarios: any[] = await this.airtableService.getData('Usuario');
        const nombreUsuario = localStorage.getItem('nombreUsuario');

        // Encuentra al usuario en la nueva consulta
        const usuarioEncontrado = usuarios.find(
          (usuario) => usuario.fields.nombre === nombreUsuario
        );

        if (
          usuarioEncontrado &&
          typeof usuarioEncontrado.fields.tipo === 'string'
        ) {
          const tipoUsuario = usuarioEncontrado.fields.tipo;

          // Actualiza los elementos en el localStorage con los nuevos datos
          localStorage.setItem('tipoUsuario', usuarioEncontrado.fields.tipo);
          localStorage.setItem(
            'nombreUsuario',
            usuarioEncontrado.fields.nombre
          );
          localStorage.setItem(
            'usuarioUsuario',
            usuarioEncontrado.fields.usuario
          );
          localStorage.setItem(
            'contrasenaUsuario',
            usuarioEncontrado.fields.contrasena
          );
          localStorage.setItem(
            'establecimientoNombre',
            usuarioEncontrado.fields.establecimiento_nombre
          );
          localStorage.setItem(
            'idUsuario',
            usuarioEncontrado.fields.id.toString()
          );
          localStorage.setItem(
            'rutUsuario',
            usuarioEncontrado.fields.rut.toString()
          );

          this.idUsuario = usuarioEncontrado.id;

          this.loggedIn = true;
          this.nombreUsuario = usuarioEncontrado.fields.nombre;
          this.primerNombre = this.extractPrimerNombre(
            usuarioEncontrado.fields.nombre
          );

          if (tipoUsuario === 'NORMAL') {
            this.router.navigateByUrl('/tarjeta');
          } else if (tipoUsuario === 'VIP') {
            this.router.navigateByUrl('/tarjeta-premium');
          }
          console.log(this.idUsuario);

          try {
            const airtableService = new AirtableService();
            await airtableService.sendData('Inicio Sesion', {
              usuario: [
                // Aquí 'records' es el nombre del campo de enlace a registros en Airtable
                this.idUsuario
              ],
            });
            console.log(this.idUsuario);
          } catch (error) {
            console.error('Error al enviar datos a Airtable:', error);
          }
        } else {
          const mensaje = 'No se encontró un usuario con el mismo nombre.';
          this.toastService.showToast(mensaje);
        }

        loading.dismiss(); // Ocultar el ProgressDialog
      } catch (error) {
        console.error(error);
        if (loading) {
          loading.dismiss(); // Ocultar el ProgressDialog en caso de error si no es null
        }
      }
    } else {
      let loading = null; // Declara la variable fuera del bloque try-catch
      try {
        loading = await this.loadingController.create({
          message: 'Iniciando Sesión...', // Mensaje del ProgressDialog
        });
        await loading.present();

        const usuarios: any[] = await this.airtableService.getData('Usuario');
        let usuarioEncontrado = null;

        for (const usuario of usuarios) {
          if (
            usuario.fields.usuario === this.usuario &&
            usuario.fields.contrasena === this.contrasena
          ) {
            usuarioEncontrado = usuario;
            break;
          }
        }

        if (
          usuarioEncontrado &&
          typeof usuarioEncontrado.fields.tipo === 'string'
        ) {
          const tipoUsuario = usuarioEncontrado.fields.tipo;
          this.idUsuario = usuarioEncontrado.id;

          localStorage.setItem('tipoUsuario', usuarioEncontrado.fields.tipo);
          localStorage.setItem(
            'nombreUsuario',
            usuarioEncontrado.fields.nombre
          );
          localStorage.setItem(
            'usuarioUsuario',
            usuarioEncontrado.fields.usuario
          );
          localStorage.setItem(
            'contrasenaUsuario',
            usuarioEncontrado.fields.contrasena
          );
          localStorage.setItem(
            'establecimientoNombre',
            usuarioEncontrado.fields.establecimiento_nombre
          );
          localStorage.setItem(
            'idUsuario',
            usuarioEncontrado.fields.id.toString()
          );
          localStorage.setItem(
            'rutUsuario',
            usuarioEncontrado.fields.rut.toString()
          );

          this.loggedIn = true;
          this.nombreUsuario = usuarioEncontrado.fields.nombre;
          this.primerNombre = this.extractPrimerNombre(
            usuarioEncontrado.fields.nombre
          );
          console.log(this.idUsuario);

          try {
            const airtableService = new AirtableService();
            await airtableService.sendData('Inicio Sesion', {
              usuario: [
                // Aquí 'records' es el nombre del campo de enlace a registros en Airtable
                this.idUsuario
              ],
            });
            console.log(this.idUsuario);
          } catch (error) {
            console.error('Error al enviar datos a Airtable:', error);
          }

          if (tipoUsuario === 'NORMAL') {
            this.router.navigateByUrl('/tarjeta');
          } else if (tipoUsuario === 'VIP') {
            this.router.navigateByUrl('/tarjeta-premium');
          }
        } else {
          const mensaje = 'Usuario y/o contraseña incorrectos';
          this.toastService.showToast(mensaje);
        }

        loading.dismiss(); // Ocultar el ProgressDialog
      } catch (error) {
        console.error(error);
        if (loading) {
          loading.dismiss(); // Ocultar el ProgressDialog en caso de error si no es null
        }
      }
    }
  }

  async realizarInicioSesion(nombreUsuario: string) {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (tipoUsuario === 'NORMAL') {
      this.router.navigateByUrl('/tarjeta');
    } else if (tipoUsuario === 'VIP') {
      this.router.navigateByUrl('/tarjeta-premium');
    }
  }

  registerBackButtonListener() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url === '/acceso') {
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

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  extractPrimerNombre(nombreCompleto: string): string {
    const nombres = nombreCompleto.split(' ');
    return nombres[0];
  }

  logout() {
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('usuarioUsuario');
    localStorage.removeItem('contrasenaUsuario');
    localStorage.removeItem('establecimientoNombre');
    localStorage.removeItem('idUsuario');

    this.loggedIn = false;
    this.nombreUsuario = '';
    this.contrasena = '';
    this.primerNombre = '';
    this.router.navigateByUrl('/acceso');
  }
}
