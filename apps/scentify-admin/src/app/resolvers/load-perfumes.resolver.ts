import { inject } from "@angular/core";
import { PerfumesStore } from "../store/perfumes.store";

export const loadPerfumesResolver = () => {
    return inject(PerfumesStore).loadPerfumes();
};
