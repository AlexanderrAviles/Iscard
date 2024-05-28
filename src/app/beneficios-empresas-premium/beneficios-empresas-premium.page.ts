// beneficios-empresas.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirtableService } from '../services/airtable.service';
import { Empresa } from '../interface/empresa.interface';

@Component({
  selector: 'app-beneficios-empresas-premium',
  templateUrl: './beneficios-empresas-premium.page.html',
  styleUrls: ['./beneficios-empresas-premium.page.scss'],
})
export class BeneficiosEmpresasPremiumPage implements OnInit {

  selectedTab = 'beneficios-categoria-premium';
  region: string = '';
  rubros: string = '';
  empresa: string = '';
  imageUrl: string = '';
  empresas: Empresa[] = []; // Utiliza la interfaz Empresa para tipar el array de empresas
  tamanoUmbral: number = 100;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private airtableService: AirtableService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.rubros = params['rubro'];
      this.region = params['region'];
    });

    this.obtenerDatosEmpresas();
    this.selectedTab = 'beneficios-categoria-premium';
  }

  tabChanged(): void {
    this.router.navigate([this.selectedTab]);
  }

  navigateToBeneficios() {
    this.router.navigate(['/beneficios-categoria-premium'], {
      queryParams: this.route.snapshot.queryParams, // Conserva los parámetros existentes
    });
  }
  navigateToBeneficiosDetalles( empresa: string) {
    this.router.navigate(['/beneficios-detalle-premium'], {
      queryParams: {empresa},
      queryParamsHandling: 'merge',
    });
  }



  async obtenerDatosEmpresas() {
    try {
      const data: any[] = await this.airtableService.getData('Empresa', 'Activas');

      this.empresas = data
        .filter((empresaData: any) => {
          return (
            empresaData.fields.rubro === this.rubros &&
            (empresaData.fields.regiones === undefined || this.region ==='Todas las Regiones' || empresaData.fields.regiones.includes(this.region))
          );
        })
        .map((empresaData: any) => {
          const empresasData: Empresa = {
            id: empresaData.id,
            activo: empresaData.fields.activo,
            nombre: empresaData.fields.nombre,
            logo:
              empresaData.fields.logo &&
              empresaData.fields.logo.length > 0
                ? empresaData.fields.logo[0]?.thumbnails.large.url
                : 'assets/frame/nodisponible.png',
            banner:
              empresaData.fields.banner &&
              empresaData.fields.banner.length > 0
                ? empresaData.fields.banner[0]?.thumbnails.large.url
                : '',
            regiones: empresaData.fields.regiones,
            rubro: empresaData.fields.rubro,
          };
          return empresasData;
        });
      console.log(this.empresas);
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
    }
  }
}
