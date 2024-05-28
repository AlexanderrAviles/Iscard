import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirtableService } from '../services/airtable.service';
import { Empresa } from '../interface/empresa.interface';
import { Convenio } from '../interface/convenio.interface';

@Component({
  selector: 'app-beneficios-detalle-premium',
  templateUrl: './beneficios-detalle-premium.page.html',
  styleUrls: ['./beneficios-detalle-premium.page.scss'],
})
export class BeneficiosDetallePremiumPage implements OnInit {
  selectedTab = 'beneficios-categoria-premium';
  descuento: string = '';
  rubro: string = '';
  empresa: string = '';
  imageUrl: string = '';
  empresas: Empresa[] = [];
  convenios: Convenio[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private airtableService: AirtableService
  ) {
    this.getEmpresas();
    this.getConvenios();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.empresa = params['empresa'];
    });
    this.selectedTab = 'beneficios-categoria-premium';
  }
  tabChanged(): void {
    this.router.navigate([this.selectedTab]);
  }

  navigateToBeneficios() {
    this.router.navigate(['/beneficios-empresas-premium'], {
      queryParams: this.route.snapshot.queryParams, // Conserva los parámetros existentes
      queryParamsHandling: 'merge',
    });
  }

  async getEmpresas() {
    return new Promise<void>((resolve, reject) => {
      this.airtableService.getData('Empresa').then(
        (data: any[]) => {
          this.empresas = data
            .filter(
              (empresaData: any) => empresaData.fields.nombre === this.empresa
            )
            .map((empresaData: any) => {
              const empresasData: Empresa = {
                id: empresaData.id,
                activo: empresaData.fields.nombre,
                nombre: empresaData.fields.empresa,
                logo:
                  empresaData.fields.logo && empresaData.fields.logo.length > 0
                    ? empresaData.fields.logo[0]?.thumbnails.large.url
                    : '',
                banner:
                  empresaData.fields.banner &&
                  empresaData.fields.banner.length > 0
                    ? empresaData.fields.banner[0]?.thumbnails.large.url
                    : '',
                regiones: empresaData.fields.regiones,
                rubro: empresaData.fields.rubro,
                url: empresaData.fields.url,
              };
              return empresasData;
            });
          console.log(this.empresas);
          resolve(); // Resolver la promesa después de cargar las empresas
        },
        (error: any) => {
          console.error('Error al obtener las empresas:', error);
          reject(error); // Rechazar la promesa en caso de error
        }
      );
    });
  }

  async getConvenios() {
    this.airtableService.getData('Convenio', 'Activos').then(
      (data: any[]) => {
        this.convenios = data
          .filter(
            (convenioData: any) =>
              convenioData.fields.empresa_nombre === this.empresa
          )
          .map((convenioData: any) => {
            const convenio: Convenio = {
              id: convenioData.id,
              nombre: convenioData.fields.nombre,
              empresa: convenioData.fields.empresa,
              descripcion: convenioData.fields.descripcion,
              empresa_nombre: convenioData.fields.empresa_nombre,
              empresa_rubro: convenioData.fields.empresa_rubro,
              empresa_slogan: convenioData.fields.empresa_slogan
                ? convenioData.fields.empresa_slogan
                : '',
              empresa_logo_url:
                convenioData.fields.empresa_logo &&
                convenioData.fields.empresa_logo.length > 0
                  ? convenioData.fields.empresa_logo[0]?.thumbnails.large.url
                  : 'assets/frame/nodisponible.png',
            };
            return convenio;
          });
        console.log(this.convenios);
      },
      (error: any) => {
        console.error('Error al obtener los convenios:', error);
      }
    );
  }
}
