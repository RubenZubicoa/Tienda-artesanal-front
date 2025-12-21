import { ResolveFn } from "@angular/router";
import { Manufacturer } from "../core/models/Manufacturer";
import { inject } from "@angular/core";
import { ManufacturerService } from "./services/manufacturer.service";

export const manufacturerResolver: ResolveFn<Manufacturer | undefined> = (route, state) => {
    const id = route.params['manufacturerId'];
    return inject(ManufacturerService).getManufacturer(id);
}

