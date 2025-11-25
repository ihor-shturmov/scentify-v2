import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './user-management.html',
    styleUrl: './user-management.css'
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    searchQuery = '';
    selectedRole: string = '';
    selectedStatus: string = '';
    loading = false;
    error: string | null = null;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.error = null;
        this.userService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.applyFilters();
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load users. Please try again.';
                this.loading = false;
                console.error('Error loading users:', err);
            }
        });
    }

    applyFilters() {
        this.filteredUsers = this.users.filter(user => {
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
    }

    editUser(user: User) {
        // TODO: Implement edit functionality
        console.log('Edit user:', user);
    }

    deleteUser(user: User) {
        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
            this.userService.deleteUser(user._id).subscribe({
                next: () => {
                    this.users = this.users.filter(u => u._id !== user._id);
                    this.applyFilters();
                },
                error: (err) => {
                    this.error = 'Failed to delete user. Please try again.';
                    console.error('Error deleting user:', err);
                }
            });
        }
    }

    toggleStatus(user: User) {
        const newStatus = !user.isActive;
        this.userService.updateUser(user._id, { isActive: newStatus }).subscribe({
            next: (updatedUser) => {
                user.isActive = updatedUser.isActive;
                this.applyFilters();
            },
            error: (err) => {
                this.error = 'Failed to update user status. Please try again.';
                console.error('Error updating status:', err);
            }
        });
    }

    changeRole(user: User) {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        this.userService.updateUser(user._id, { role: newRole }).subscribe({
            next: (updatedUser) => {
                user.role = updatedUser.role as 'admin' | 'user';
                this.applyFilters();
            },
            error: (err) => {
                this.error = 'Failed to update user role. Please try again.';
                console.error('Error updating role:', err);
            }
        });
    }
}
