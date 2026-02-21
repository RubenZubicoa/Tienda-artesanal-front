import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService, TranslationObject } from '@ngx-translate/core';
import { map, Observable, of, switchMap } from 'rxjs';

/**
 * Servicio para cargar traducciones específicas de cada componente.
 *
 * Convención: Cada componente puede tener una carpeta `i18n/` con sus archivos
 * de traducción (es.json, en.json, etc.) en su mismo directorio.
 *
 * Ejemplo de estructura:
 *   src/app/home/i18n/es.json
 *   src/app/home/i18n/en.json
 *   src/app/products/i18n/es.json
 *
 * Los archivos se copian a assets/i18n-components/ manteniendo la estructura,
 * por lo que el path del componente es la ruta relativa desde app (ej: "home", "products").
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentI18nLoaderService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  private readonly basePath = './assets/i18n-components';

  /**
   * Carga las traducciones del componente indicado y las fusiona con las existentes.
   * @param componentPath - Ruta del componente relativa a app (ej: "home", "products/list")
   */
  loadTranslations(componentPath: string): Observable<void> {
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const url = `${this.basePath}/${componentPath}/i18n/${lang}.json`;

    return this.http.get<Record<string, unknown>>(url).pipe(
      map((translations) => {
        this.translate.setTranslation(lang as string, translations as TranslationObject, true);
      }),
    );
  }

  /**
   * Carga las traducciones para el idioma actual y opcionalmente para el fallback.
   * Útil cuando el componente se monta y el idioma puede cambiar.
   */
  loadTranslationsWithFallback(
    componentPath: string,
    fallbackLang?: string
  ): Observable<void> {
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const fallback = fallbackLang ?? this.translate.defaultLang;

    const loadLang = (l: string) => {
      const url = `${this.basePath}/${componentPath}/i18n/${l}.json`;
      return this.http.get<Record<string, unknown>>(url).pipe(
        map((translations) => {
          this.translate.setTranslation(l, translations as TranslationObject, true);
        })
      );
    };

    return loadLang(lang as string).pipe(
      switchMap(() => (lang !== fallback ? loadLang(fallback as string) : of(void 0)))
    );
  }
}
