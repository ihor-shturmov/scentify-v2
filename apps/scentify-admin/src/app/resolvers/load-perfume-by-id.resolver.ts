import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { PerfumesStore } from "../store/perfumes.store";

export const loadPerfumeByIdResolver = (route: ActivatedRouteSnapshot) => {
    return inject(PerfumesStore).loadPerfume(route.params['id']);
};
