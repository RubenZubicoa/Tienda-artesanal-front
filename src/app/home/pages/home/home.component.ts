import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentI18nLoaderService } from '../../../core/services/component-i18n-loader.service';
import { CurrentLanguegeService } from '../../../core/services/current-languege.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.i18nLoader.loadTranslations('home').pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public sections: Section[] = [
    {
      title: 'sections.artesanos.title',
      description:
        'sections.artesanos.description',
      image: 'https://cdn.pixabay.com/photo/2016/07/03/16/30/medieval-1495045_1280.jpg',
    },
    {
      title: 'sections.productos.title',
      description: 'sections.productos.description',
      image: 'https://cdn.pixabay.com/photo/2016/03/26/18/23/bread-1281053_1280.jpg',
    },
  ];

  public navigateToSection(section: Section) {
    switch (section.title) {
      case 'sections.productos.title':
        this.router.navigate(['/products']);
        break;
      case 'sections.artesanos.title':
        this.router.navigate(['/manufacturers']);
        break;
    }
  }
}
