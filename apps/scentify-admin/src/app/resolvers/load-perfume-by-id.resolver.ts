import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PerfumesStore } from "../store/perfumes.store";

export const loadPerfumeByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PerfumesStore).loadPerfume(route.params['id']);
};
