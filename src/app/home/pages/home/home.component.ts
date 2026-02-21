import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentI18nLoaderService } from '../../../core/services/component-i18n-loader.service';
import { CurrentLanguegeService } from '../../../core/services/current-languege.service';

interface Section {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public readonly router = inject(Router);
  public readonly currentLanguegeService = inject(CurrentLanguegeService);
  private readonly i18nLoader = inject(ComponentI18nLoaderService);

  constructor() {
    this.i18nLoader.loadTranslations('home').subscribe();
  }

  public sections: Section[] = [
    {
      title: 'Artesanos',
      description:
        'Encuentra los mejores vendedores de productos artesanales de la region',
      image: 'https://cdn.pixabay.com/photo/2016/07/03/16/30/medieval-1495045_1280.jpg',
    },
    {
      title: 'Productos',
      description: 'Encuentra los mejores productos artesanales de la region',
      image: 'https://cdn.pixabay.com/photo/2016/03/26/18/23/bread-1281053_1280.jpg',
    },
  ];

  public navigateToSection(section: Section) {
    switch (section.title) {
      case 'Productos':
        this.router.navigate(['/products']);
        break;
      case 'Artesanos':
        this.router.navigate(['/manufacturers']);
        break;
    }
  }
}
