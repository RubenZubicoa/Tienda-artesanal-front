import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EnumsService } from '../../../core/services/enums.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormService } from '../../services/product-form.service';
import { ProductsService } from '../../../products/services/products.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ToastTypes } from '../../../shared/components/toast/toastData';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { Product } from '../../../core/models/Product';

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent implements OnInit {
  private readonly enumsService = inject(EnumsService);
  private readonly productFormService = inject(ProductFormService);
  private readonly productsService = inject(ProductsService);
  private readonly dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly data = inject<{ product?: Product }>(MAT_DIALOG_DATA);
  
  public productForm = this.productFormService.crearFormulario();
  public categories = toSignal(this.enumsService.getCategories());

  public images = signal<string[]>([]);
  public isUpdateMode = signal<boolean>(false);
  private readonly MAX_IMAGES = 10;

  ngOnInit(): void {
    if (this.data.product) {
      console.log(this.data.product);
      this.productFormService.actualizarFormulario(this.productForm, this.data.product);
      this.images.set(this.data.product.images);
      this.isUpdateMode.set(true);
      return
    }
    this.isUpdateMode.set(false);
  }

  public addImage(image: string) {
    if (this.images().length >= this.MAX_IMAGES) {
      return;
    }
    this.images.update((prev) => [...prev, image]);
  }

  public removeImage(index: number) {
    this.images.update((prev) => prev.filter((_, i) => i !== index));
  }

  public saveChanges(){
    console.log(this.isUpdateMode());
    if (this.isUpdateMode()) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  private addProduct() {
    this.productFormService.setImages(this.productForm, this.images());
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.createProduct(product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto agregado', 'El producto ha sido agregado correctamente');
        this.dialogRef.close( { success: true, product: product } );
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'El producto no ha sido agregado correctamente');
        this.dialogRef.close( { success: false } );
      }
    });
  }

  private updateProduct() {
    this.productFormService.setImages(this.productForm, this.images());
    const product = this.productFormService.obtenerDatos(this.productForm);
    this.validateManufacturer();
    product.manufacturerId = this.currentUserService.currentUser()?.manufacturerId ?? '';
    this.productsService.updateProduct(this.data.product?.uuid ?? '', product).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.toastService.showMessage(ToastTypes.SUCCESS, 'Producto actualizado', 'El producto ha sido actualizado correctamente');
        this.dialogRef.close( { success: true, product: product } );
      },
      error: () => {
        this.toastService.showMessage(ToastTypes.ERROR, 'Error al actualizar producto', 'El producto no ha sido actualizado correctamente');
        this.dialogRef.close( { success: false } );
      }
    });
  }

  private validateManufacturer() {
    if (!this.currentUserService.isManufacturer()) {
      this.toastService.showMessage(ToastTypes.ERROR, 'Error al agregar producto', 'No tienes un fabricante asociado, por favor contacta al administrador');
      return;
    }
  }
}
