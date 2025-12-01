import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { PerfumesFacade } from "../facades/perfumes.facade";

export const loadPerfumeByIdResolver = (route: ActivatedRouteSnapshot) => {
    return inject(PerfumesFacade).loadPerfume(route.params['id']);
};
