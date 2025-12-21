import { ResolveFn } from "@angular/router";
import { PRODUCTS_LIST } from "../core/data/products";
import { Product } from "../core/models/Product";
import { ProductsService } from "./services/products.service";
import { inject } from "@angular/core";

export const productResolver: ResolveFn<Product | undefined> = (route, state) => {
    const id = route.params['id'];
    return inject(ProductsService).getProduct(id);
}