import { inject } from "@angular/core";
import { UsersFacade } from "../facades/users.facade";

export const loadUsersResolver = () => {
    return inject(UsersFacade).loadUsers();
};
