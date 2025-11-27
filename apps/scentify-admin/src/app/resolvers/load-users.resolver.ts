import { inject } from "@angular/core";
import { UsersStore } from "../store/users.store";

export const loadUsersResolver = () => {
    return inject(UsersStore).loadUsers();
};
