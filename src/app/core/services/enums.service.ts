import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable, map } from 'rxjs';
import { Category, CategoryDB, mapCategoryToCategory } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {
  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL;

  private readonly _categories = signal<Category[]>([]);

  get categories() {
    return this._categories.asReadonly();
  }

  constructor() {
    this.getCategories().subscribe(categories => {
      this._categories.set(categories);
    });
  }

  private getCategories(): Observable<Category[]> {
    return this.http.get<CategoryDB[]>(this.url + API_CONFIG.CATEGORIES_URL).pipe(map(categories => categories.map(mapCategoryToCategory)));
  }
}
