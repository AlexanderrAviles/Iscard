import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../services/airtable.service';
import { Convenio } from '../interface/convenio.interface';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beneficios-premium',
  templateUrl: './beneficios-premium.page.html',
  styleUrls: ['./beneficios-premium.page.scss'],
})
export class BeneficiosPremiumPage implements OnInit {
  convenios: Convenio[] = [];
  loading: any;
  rubros: string[] = [];
  selectedTab = 'beneficios-categoria-premium';
  imageUrl: string = '';
  rubro: string = '';
  region: string = '';

  constructor(
    private airtableService: AirtableService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.showLoading();
    await this.getConvenios();
    await this.dismissLoading();
    this.selectedTab = 'beneficios-categoria-premium';
    this.route.queryParams.subscribe((params) => {
      this.rubro = params['rubro'] || '';
      this.imageUrl = params['imageUrl'] || '';
      this.region = params['region'] || '';


    });

  }

  ionViewWillLeave() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  // ionViewWillEnter() {
  //   // Establecer la opción seleccionada en 'beneficios'
  //   this.selectedTab = 'beneficios-categoria';
  // }
  tabChanged(): void {
    this.router.navigate([this.selectedTab]);
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando beneficios...',
      spinner: 'crescent',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  navigateToBeneficiosDetalle(rubro: string, descuento: string, empresa: string, imageUrl: string) {
    this.router.navigate(['/beneficios-detalle-premium'], {
      queryParams: { rubro, descuento, empresa, imageUrl },
    });
  }

  async getConvenios(offset = '') {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando beneficios...',
      spinner: 'bubbles',
      cssClass: 'custom-loading',
      backdropDismiss: false,
      keyboardClose: false,
    });

    try {
      await loading.present();

      await this.fetchConvenios(offset);


      // Resto de tu código
      this.rubros = Array.from(new Set(this.convenios.map(convenio => convenio.empresa_rubro)));
      this.convenios.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } catch (error) {
      console.error('Error al obtener los convenios:', error);
    } finally {
      loading.dismiss();
    }
  }

  async fetchConvenios(offset = '') {
    let url = `https://api.airtable.com/v0/appAbjUQoRO81ekG4/Convenio?view=Activos`;
    if (offset) {
      url += `&offset=${offset}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer pat0F1ycdCiUsh4WA.ed326606b19183db4cc832516f78d7b3212de90d2c6b4f914f53c34da0939039`,
          'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según las necesidades de tu API
        },
      });
      const data = await response.json();



      // Filtra y mapea los datos
      const filteredConvenios = data.records
        .filter((convenioData: any) => {
          const empresaRegiones: string[] = convenioData.fields.empresa_regiones || [];
          const arrayRegiones = empresaRegiones.join()
          const regioneSeparadas  = arrayRegiones.split(",").map(arrayRegiones => arrayRegiones.trim());

          return (
            regioneSeparadas.includes(this.region) &&
            convenioData.fields.empresa_rubro === this.rubro
          );
        })
        .map((convenioData: any) => {
          const convenios: Convenio = {
            id: convenioData.id,
            nombre: convenioData.fields.nombre,
            empresa: convenioData.fields.empresa,
            descripcion: convenioData.fields.descripcion,
            empresa_nombre: convenioData.fields.empresa_nombre,
            empresa_rubro: convenioData.fields.empresa_rubro,
            empresa_slogan: convenioData.fields.empresa_slogan ? convenioData.fields.empresa_slogan : '',
            empresa_logo_url: convenioData.fields.empresa_logo &&
              convenioData.fields.empresa_logo.length > 0
              ? convenioData.fields.empresa_logo[0]?.thumbnails.large.url
              : 'assets/frame/nodisponible.png',
          };
          return convenios;
        });



      // Agrega los nuevos convenios a la lista existente
      this.convenios = [...this.convenios, ...filteredConvenios];
      console.log(this.convenios);

      // Verifica si hay más registros y paginar si es necesario
      if (data.offset) {
        await this.fetchConvenios(data.offset);
      }
    } catch (error) {
      console.error(error);
      throw error; // Re-lanza el error para que sea manejado por el bloque catch en la función principal
    }
  }

}
