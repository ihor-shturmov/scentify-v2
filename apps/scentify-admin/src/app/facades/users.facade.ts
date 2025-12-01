import { Injectable, inject } from '@angular/core';
import { UsersStore } from '../store/users.store';
import { AdminUser } from '@scentify/shared-types';

/**
 * Facade service for user-related operations.
 * Provides an abstraction layer between components and the UsersStore.
 */
@Injectable({
    providedIn: 'root'
})
export class UsersFacade {
    private readonly store = inject(UsersStore);

    // State signals
    readonly users = this.store.users;
    readonly selectedUser = this.store.selectedUser;
    readonly isLoading = this.store.isLoading;
    readonly error = this.store.error;

    // Computed signals
    readonly userCount = this.store.userCount;
    readonly hasUsers = this.store.hasUsers;
    readonly activeUserCount = this.store.activeUserCount;
    readonly inactiveUserCount = this.store.inactiveUserCount;
    readonly adminCount = this.store.adminCount;
    readonly regularUserCount = this.store.regularUserCount;

    /**
     * Load all users
     */
    loadUsers(): void {
        this.store.loadUsers();
    }

    /**
     * Load a single user by ID
     */
    loadUser(id: string): void {
        this.store.loadUser(id);
    }

    /**
     * Update a user
     */
    updateUser(id: string, data: Partial<AdminUser>): void {
        this.store.updateUser({ id, data });
    }

    /**
     * Delete a user
     */
    deleteUser(id: string): void {
        this.store.deleteUser(id);
    }

    /**
     * Toggle user active status
     */
    toggleUserStatus(id: string): void {
        this.store.toggleUserStatus(id);
    }

    /**
     * Change user role (admin <-> user)
     */
    changeUserRole(id: string): void {
        this.store.changeUserRole(id);
    }

    /**
     * Select a user
     */
    selectUser(user: AdminUser | null): void {
        this.store.selectUser(user);
    }

    /**
     * Clear the selected user
     */
    clearSelectedUser(): void {
        this.store.clearSelectedUser();
    }

    /**
     * Clear any error messages
     */
    clearError(): void {
        this.store.clearError();
    }

    /**
     * Reset the store to initial state
     */
    reset(): void {
        this.store.reset();
    }
}
