import { inject } from "@angular/core";
import { PerfumesFacade } from "../facades/perfumes.facade";
import { UsersFacade } from "../facades/users.facade";

export const loadDashboardResolver = () => {
    const perfumesFacade = inject(PerfumesFacade);
    const usersFacade = inject(UsersFacade);

    // Load data from both facades
    perfumesFacade.loadPerfumes();
    usersFacade.loadUsers();
};
