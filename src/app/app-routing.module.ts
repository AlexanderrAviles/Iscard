import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tarjeta-premium',
    loadChildren: () => import('./tarjeta-premium/tarjeta-premium.module').then( m => m.TarjetaPremiumPageModule)
  },
  {
    path: 'acceso',
    loadChildren: () => import('./acceso/acceso.module').then( m => m.AccesoPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'actividad-premium',
    loadChildren: () => import('./actividad-premium/actividad-premium.module').then( m => m.ActividadPremiumPageModule)
  },
  {
    path: 'beneficios',
    loadChildren: () => import('./beneficios/beneficios.module').then( m => m.BeneficiosPageModule)
  },
  {
    path: 'beneficios-categoria',
    loadChildren: () => import('./beneficios-categoria/beneficios-categoria.module').then( m => m.BeneficiosCategoriaPageModule)
  },
  {
    path: 'beneficios-categoria-premium',
    loadChildren: () => import('./beneficios-categoria-premium/beneficios-categoria-premium.module').then( m => m.BeneficiosCategoriaPremiumPageModule)
  },
  {
    path: 'beneficios-detalle',
    loadChildren: () => import('./beneficios-detalle/beneficios-detalle.module').then( m => m.BeneficiosDetallePageModule)
  },
  {
    path: 'beneficios-detalle-premium',
    loadChildren: () => import('./beneficios-detalle-premium/beneficios-detalle-premium.module').then( m => m.BeneficiosDetallePremiumPageModule)
  },
  {
    path: 'beneficios-premium',
    loadChildren: () => import('./beneficios-premium/beneficios-premium.module').then( m => m.BeneficiosPremiumPageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'beneficios-empresas',
    loadChildren: () => import('./beneficios-empresas/beneficios-empresas.module').then( m => m.BeneficiosEmpresasPageModule)
  },
  {
    path: 'beneficios-empresas-premium',
    loadChildren: () => import('./beneficios-empresas-premium/beneficios-empresas-premium.module').then( m => m.BeneficiosEmpresasPremiumPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
