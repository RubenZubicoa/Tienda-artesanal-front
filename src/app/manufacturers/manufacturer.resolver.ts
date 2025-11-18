import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { MANUFACTURERS_LIST } from "../core/data/manufacturers";
import { Manufacturer } from "../core/models/Manufacturer";

export const manufacturerResolver: ResolveFn<Manufacturer | undefined> = (route, state) => {
    const id = route.params['manufacturerId'];
    return MANUFACTURERS_LIST.find(manufacturer => manufacturer.uuid === id);
}

