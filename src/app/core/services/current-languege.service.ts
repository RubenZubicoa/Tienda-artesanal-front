import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLanguegeService {

  private readonly translate = inject(TranslateService);

  public get currentLanguege() {
    return this.translate.getCurrentLang();
  }

  public setCurrentLanguege(lang: 'es' | 'eus') {
    this.translate.use(lang);
    console.log(this.currentLanguege);
  }

  constructor() { }
}
