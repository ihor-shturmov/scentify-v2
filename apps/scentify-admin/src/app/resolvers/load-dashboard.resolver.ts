import { inject } from "@angular/core";
import { PerfumesStore } from "../store/perfumes.store";
import { UsersStore } from "../store/users.store";

export const loadDashboardResolver = () => {
    const perfumesStore = inject(PerfumesStore);
    const usersStore = inject(UsersStore);

    // Load data from both stores
    perfumesStore.loadPerfumes();
    usersStore.loadUsers();
};
