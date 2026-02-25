import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InsertOneResult, UpdateOneResult } from '../../../core/models/InsertOneResult';
import { Product } from '../../../core/models/Product';
import { AddProductImage } from '../../../core/models/ProductImage';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { EnumsService } from '../../../core/services/enums.service';
import { ProductImagesService } from '../../../products/services/product-images.service';
import { ProductsService } from '../../../products/services/products.service';
import { CarruselComponent } from '../../../shared/components/carrusel/carrusel.component';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { ProductFormService } from '../../services/product-form.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CarruselComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  private readonly enumsService = inject(EnumsService);
  private readonly productFormService = inject(ProductFormService);
  private readonly productsService = inject(ProductsService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly productImagesService = inject(ProductImagesService);
  private readonly router = inject(Router);
  
  public product = input<Product>()
  public productForm = this.productFormService.crearFormulario();
  public categories = this.enumsService.categories;

  public images = signal<string[]>([]);
  public isUpdateMode = signal<boolean>(false);
  private imageFiles = signal<File[]>([]);

  private readonly MAX_IMAGES = 10;

  ngOnInit(): void {
    const product = this.product();
    if (product) {
      this.productFormService.actualizarFormulario(this.productForm, product);
      this.images.set(product.images);
      this.isUpdateMode.set(true);
      return
    }
    this.isUpdateMode.set(false);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (this.images().length >= this.MAX_IMAGES) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Límite de imágenes alcanzado', 
          `Solo puedes agregar hasta ${this.MAX_IMAGES} imágenes`
        );
        return;
      }

      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo inválido', 
          'Por favor selecciona un archivo de imagen'
        );
        return;
      }

      // Validar tamaño (por ejemplo, máximo 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Archivo muy grande', 
          'El tamaño máximo permitido es 5MB'
        );
        return;
      }

      // Convertir archivo a base64
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        this.images.update((prev) => [...prev, base64String]);
        this.imageFiles.update((prev) => [...prev, file]);
      };
      reader.onerror = () => {
        this.toastService.showMessage(
          ToastTypes.ERROR, 
          'Error al leer archivo', 
          'No se pudo leer el archivo seleccionado'
        );
      };
      reader.readAsDataURL(file);

      // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      input.value = '';
    }
  }

  public addImage(image: string) {
    if (this.images().length >= this.MAX_IMAGES) {
      return;
    }
    this.images.update((prev) => [...prev, image]);
  }

  public saveChanges(){
    if (this.isUpdateMode()) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  public removeImages() {
    this.images.set([]);
    this.imageFiles.set([]);
  }

  private addProduct() {
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.createProduct(product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result: InsertOneResult) => {
        this.addProductImages({...product, uuid: result.insertedId});
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'El producto no ha sido agregado correctamente');
      }
    });
  }

  private updateProduct() {
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.updateProduct(this.product()?.uuid ?? '', product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (result: UpdateOneResult) => {
        this.addProductImages({...product, uuid: this.product()?.uuid ?? ''});
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al actualizar producto', 'El producto no ha sido actualizado correctamente');
      }
    });
  }

  private validateManufacturer() {
    if (!this.currentUserService.isManufacturer()) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'No tienes un fabricante asociado, por favor contacta al administrador');
      return;
    }
  }

  private addProductImages(product: Product) {
    const addProductImage: AddProductImage = {
      productId: product.uuid,
      images: this.imageFiles(),
      oldImages: this.images().filter((image: string) => image.includes('https')),
    }
    this.productImagesService.addProductImages(addProductImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto actualizado', 'El producto ha sido actualizado correctamente');
        this.router.navigate(['/my-products']);
      }
    });
  }
}
