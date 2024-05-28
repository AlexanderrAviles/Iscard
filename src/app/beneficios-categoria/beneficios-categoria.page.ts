import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirtableService } from '../services/airtable.service';
import { MenuService } from '../services/menu.service';
import { MenuController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-beneficios-categoria',
  templateUrl: './beneficios-categoria.page.html',
  styleUrls: ['./beneficios-categoria.page.scss'],
})
export class BeneficiosCategoriaPage implements OnInit {
  selectedTab = 'beneficios-categoria';
  empresas: any[] = [];
  regiones: string[] = [];
  rubros: string[] = [];
  regionSeleccionada: string = '';
  imagenesRubro: { [rubro: string]: string } = {};
  mostrarMensajeSinRubros: boolean = false;
  timestamp: number;

  constructor(
    private router: Router,
    private airtableService: AirtableService,
    private menuService: MenuService,
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location
  ) {
    this.timestamp = Date.now();
  }

  ngOnInit() {
    // Establecer la región seleccionada inicialmente
    this.regionSeleccionada = 'Región Metropolitana'; // Actualiza con la región predeterminada
    this.fetchEmpresas();
    this.menuService.setActiveItem('beneficios-categoria');
  }

  navigateToBeneficios(rubro: string, region: string) {
    this.router.navigate(['/beneficios-empresas'], {
      queryParams: { rubro, region },
      queryParamsHandling: 'merge',
    });
  }

  onRegionChange(event: any) {
    this.regionSeleccionada = event.target.value;
    this.fetchEmpresas();
  }
  openMenu() {
    this.menuCtrl.open('menu' + this.timestamp);
  }

  ionViewWillEnter() {
    this.selectedTab = 'beneficios-categoria';
    this.menuCtrl.enable(true);
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.location.back();
    });
  }

  tabChanged() {
    this.router.navigate([this.selectedTab]);
  }

  async fetchEmpresas() {
    // Obtener todos los datos de la tabla 'Empresa' desde Airtable
    this.airtableService.getData('Empresa', 'Activas').then(
      (data: any[]) => {
        // Crear un conjunto (Set) para almacenar los rubros únicos
        const rubrosUnicos = new Set<string>();
        // Crear un objeto para almacenar las imágenes de rubro únicas
        const imagenesRubro: { [rubro: string]: string } = {};

        // Filtrar las empresas según la región seleccionada y el campo convenio no esté vacío
        const empresasFiltradas =
          this.regionSeleccionada !== 'Todas las Regiones'
            ? data.filter((empresaData: any) => {
                const regiones = empresaData.fields.regiones;
                const convenio = empresaData.fields.convenio;
                return (
                  regiones &&
                  regiones.includes(this.regionSeleccionada) &&
                  convenio !== '' &&
                  convenio !== null &&
                  convenio !== undefined
                );
              })
            : data.filter((empresaData: any) => {
                const convenio = empresaData.fields.convenio;
                return (
                  convenio !== '' && convenio !== null && convenio !== undefined
                );
              });

        // Procesar las empresas filtradas
        empresasFiltradas.forEach((empresaData: any) => {
          const rubro = empresaData.fields.rubro;

          if (rubro) {
            rubrosUnicos.add(rubro);

            const imagenRubro = empresaData.fields.imagen_rubro;

            if (imagenRubro && imagenRubro.length > 0) {
              const urlImagenLarge = imagenRubro[0]?.thumbnails?.large?.url;

              if (urlImagenLarge) {
                if (!imagenesRubro[rubro]) {
                  imagenesRubro[rubro] = urlImagenLarge;
                }
              } else {
                console.log(
                  'La URL de la imagen "large" no está disponible en los datos.'
                );
              }
            } else {
              console.log(
                'No se encontró información en el campo "imagen_rubro".'
              );
            }
          }
        });

        // Convertir el conjunto en un array para los rubros y ordenar alfabéticamente
        this.rubros = Array.from(rubrosUnicos);
        // Almacenar las imágenes de rubro únicas en un objeto
        this.imagenesRubro = imagenesRubro;

        // Verificar si no hay rubros en la región y mostrar el mensaje
        if (this.rubros.length === 0) {
          this.mostrarMensajeSinRubros = true;
        } else {
          this.mostrarMensajeSinRubros = false;
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de la tabla Empresa:', error);
      }
    );
  }
}
