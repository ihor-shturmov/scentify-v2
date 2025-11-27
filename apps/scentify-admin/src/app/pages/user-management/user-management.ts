import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersStore } from '../../store/users.store';
import { AdminUser } from '@scentify/shared-types';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './user-management.html',
})
export class UserManagementComponent implements OnInit {
    private readonly usersStore = inject(UsersStore);

    // Store signals
    users = this.usersStore.users;
    isLoading = this.usersStore.isLoading;
    error = this.usersStore.error;
    userCount = this.usersStore.userCount;
    activeUserCount = this.usersStore.activeUserCount;
    inactiveUserCount = this.usersStore.inactiveUserCount;
    adminCount = this.usersStore.adminCount;
    regularUserCount = this.usersStore.regularUserCount;

    // Local filter state
    searchQuery = '';
    selectedRole = '';
    selectedStatus = '';

    // Computed filtered users
    filteredUsers = computed(() => {
        const users = this.users();
        return users.filter(user => {
            const matchesSearch =
                user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(this.searchQuery.toLowerCase());

            const matchesRole = !this.selectedRole || user.role === this.selectedRole;
            const matchesStatus = !this.selectedStatus ||
                (this.selectedStatus === 'active' && user.isActive) ||
                (this.selectedStatus === 'inactive' && !user.isActive);

            return matchesSearch && matchesRole && matchesStatus;
        });
    });

    ngOnInit() {
        this.usersStore.loadUsers();
    }

    applyFilters() {
        // Filters are applied automatically via computed signal
    }

    editUser(user: AdminUser) {
        // TODO: Implement edit functionality
        console.log('Edit user:', user);
    }

    deleteUser(user: AdminUser) {
        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            this.usersStore.deleteUser(user.id);
        }
    }

    toggleStatus(user: AdminUser) {
        this.usersStore.toggleUserStatus(user.id);
    }

    changeRole(user: AdminUser) {
        this.usersStore.changeUserRole(user.id);
    }

    clearError() {
        this.usersStore.clearError();
    }
}
