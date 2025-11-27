import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AdminUser } from '@scentify/shared-types';
import { UserService } from '../services/user.service';

// State interface
interface UsersState {
    users: AdminUser[];
    selectedUser: AdminUser | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: UsersState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
};

export const UsersStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ users }) => ({
        userCount: computed(() => users().length),
        hasUsers: computed(() => users().length > 0),
        activeUserCount: computed(() => users().filter(u => u.isActive).length),
        inactiveUserCount: computed(() => users().filter(u => !u.isActive).length),
        adminCount: computed(() => users().filter(u => u.role === 'admin').length),
        regularUserCount: computed(() => users().filter(u => u.role === 'user').length),
    })),
    withMethods((store, userService = inject(UserService)) => ({
        // Clear selected user
        clearSelectedUser: () => {
            patchState(store, { selectedUser: null });
        },

        // Load all users
        loadUsers: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(() =>
                    userService.getUsers().pipe(
                        tapResponse({
                            next: (users) =>
                                patchState(store, { users, isLoading: false }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Load single user
        loadUser: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) =>
                    userService.getUser(id).pipe(
                        tapResponse({
                            next: (user) =>
                                patchState(store, { selectedUser: user, isLoading: false }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Update user
        updateUser: rxMethod<{ id: string; data: Partial<AdminUser> }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ id, data }) =>
                    userService.updateUser(id, data).pipe(
                        tapResponse({
                            next: (updatedUser) =>
                                patchState(store, {
                                    users: store.users().map((u) =>
                                        u.id === id ? updatedUser : u
                                    ),
                                    selectedUser:
                                        store.selectedUser()?.id === id
                                            ? updatedUser
                                            : store.selectedUser(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Delete user
        deleteUser: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) =>
                    userService.deleteUser(id).pipe(
                        tapResponse({
                            next: () =>
                                patchState(store, {
                                    users: store.users().filter((u) => u.id !== id),
                                    selectedUser:
                                        store.selectedUser()?.id === id
                                            ? null
                                            : store.selectedUser(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Toggle user status
        toggleUserStatus: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) => {
                    const user = store.users().find(u => u.id === id);
                    if (!user) {
                        patchState(store, {
                            error: 'User not found',
                            isLoading: false,
                        });
                        return [];
                    }

                    return userService.updateUser(id, { isActive: !user.isActive }).pipe(
                        tapResponse({
                            next: (updatedUser) =>
                                patchState(store, {
                                    users: store.users().map((u) =>
                                        u.id === id ? updatedUser : u
                                    ),
                                    selectedUser:
                                        store.selectedUser()?.id === id
                                            ? updatedUser
                                            : store.selectedUser(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    );
                })
            )
        ),

        // Change user role
        changeUserRole: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) => {
                    const user = store.users().find(u => u.id === id);
                    if (!user) {
                        patchState(store, {
                            error: 'User not found',
                            isLoading: false,
                        });
                        return [];
                    }

                    const newRole = user.role === 'admin' ? 'user' : 'admin';
                    return userService.updateUser(id, { role: newRole }).pipe(
                        tapResponse({
                            next: (updatedUser) =>
                                patchState(store, {
                                    users: store.users().map((u) =>
                                        u.id === id ? updatedUser : u
                                    ),
                                    selectedUser:
                                        store.selectedUser()?.id === id
                                            ? updatedUser
                                            : store.selectedUser(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    );
                })
            )
        ),

        // Select user
        selectUser(user: AdminUser | null) {
            patchState(store, { selectedUser: user });
        },

        // Clear error
        clearError() {
            patchState(store, { error: null });
        },

        // Reset store
        reset() {
            patchState(store, initialState);
        },
    }))
);
