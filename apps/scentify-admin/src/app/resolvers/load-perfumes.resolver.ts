import { inject } from "@angular/core";
import { PerfumesFacade } from "../facades/perfumes.facade";

export const loadPerfumesResolver = () => {
    return inject(PerfumesFacade).loadPerfumes();
};
