import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

/**
 * Configuración de i18n:
 * - Traducciones globales: /i18n/ (carpeta public/i18n/)
 * - Traducciones por componente: carpeta i18n/ dentro de cada componente (src/app/{componente}/i18n/)
 *   Se copian a assets/i18n-components/ y se cargan con ComponentI18nLoaderService.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideTranslateService({
      lang: 'es',
      fallbackLang: 'es',
      // loader: provideTranslateHttpLoader({
      //   prefix: '/i18n/',
      //   suffix: '.json'
      // })
    }),
  ]
};
