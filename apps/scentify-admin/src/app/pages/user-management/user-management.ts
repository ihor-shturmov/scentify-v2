import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersFacade } from '../../facades/users.facade';
import { AdminUser } from '@scentify/shared-types';
import {
    DataTableComponent,
    TableFiltersComponent,
    SortState,
} from '../../components/ui/data-table';
import { USER_FILTER_FIELDS, USER_TABLE_CONFIG } from './user-management.config';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule, DataTableComponent, TableFiltersComponent],
    templateUrl: './user-management.html',
})
export class UserManagementComponent {
    private readonly usersFacade = inject(UsersFacade);

    // Store signals
    users = this.usersFacade.users;
    isLoading = this.usersFacade.isLoading;
    error = this.usersFacade.error;
    userCount = this.usersFacade.userCount;
    activeUserCount = this.usersFacade.activeUserCount;
    inactiveUserCount = this.usersFacade.inactiveUserCount;
    adminCount = this.usersFacade.adminCount;
    regularUserCount = this.usersFacade.regularUserCount;

    // Filter state
    filterValues = signal<Record<string, string>>({
        search: '',
        role: '',
        status: '',
    });

    // Imported configurations
    readonly filterFields = USER_FILTER_FIELDS;
    readonly tableConfig = USER_TABLE_CONFIG;

    // Computed filtered users
    filteredUsers = computed(() => {
        const users = this.users();
        const filters = this.filterValues();
        const searchTerm = filters['search'] ?? '';
        const roleFilter = filters['role'] ?? '';
        const statusFilter = filters['status'] ?? '';

        return users.filter((user) => {
            const matchesSearch =
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus =
                !statusFilter ||
                (statusFilter === 'active' && user.isActive) ||
                (statusFilter === 'inactive' && !user.isActive);

            return matchesSearch && matchesRole && matchesStatus;
        });
    });

    onFilterChange(event: { key: string; value: string }): void {
        this.filterValues.update((current) => ({
            ...current,
            [event.key]: event.value,
        }));
    }

    onClearFilters(): void {
        this.filterValues.set({ search: '', role: '', status: '' });
    }

    onSortChange(sort: SortState): void {
        console.log('Sort changed:', sort);
        // TODO: Implement sorting
    }

    onActionClick(event: { action: string; item: AdminUser }): void {
        switch (event.action) {
            case 'edit':
                this.editUser(event.item);
                break;
            case 'delete':
                this.deleteUser(event.item);
                break;
        }
    }

    editUser(user: AdminUser) {
        // TODO: Implement edit functionality
        console.log('Edit user:', user);
    }

    deleteUser(user: AdminUser) {
        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            this.usersFacade.deleteUser(user.id);
        }
    }

    toggleStatus(user: AdminUser) {
        this.usersFacade.toggleUserStatus(user.id);
    }

    changeRole(user: AdminUser) {
        this.usersFacade.changeUserRole(user.id);
    }

    clearError() {
        this.usersFacade.clearError();
    }
}
