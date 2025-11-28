import { FilterField, TableConfig } from '../../components/ui/data-table';
import { AdminUser } from '@scentify/shared-types';

export const USER_FILTER_FIELDS: FilterField[] = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search by name or email...',
        colSpan: 2,
    },
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        placeholder: 'All Roles',
        options: [
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'All Status',
        options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
        ],
    },
];

export const USER_TABLE_CONFIG: TableConfig<AdminUser> = {
    trackBy: 'id',
    columns: [
        { key: 'user', header: 'User', field: 'firstName' },
        { key: 'email', header: 'Email', field: 'email' },
        {
            key: 'role',
            header: 'Role',
            field: 'role',
            type: 'badge',
            capitalize: true,
            badgeColors: {
                admin: 'bg-purple-50 text-purple-700 ring-purple-600/20',
                user: 'bg-gray-50 text-gray-700 ring-gray-600/20',
            },
            sortable: true,
        },
        {
            key: 'status',
            header: 'Status',
            field: 'isActive',
        },
        {
            key: 'createdAt',
            header: 'Created',
            field: 'createdAt',
            type: 'date',
            dateFormat: 'MMM d, y',
            hideOnMobile: true,
            sortable: true,
        },
        {
            key: 'lastLogin',
            header: 'Last Login',
            field: 'lastLogin',
            type: 'date',
            dateFormat: 'MMM d, y',
            hideOnMobile: true,
        },
    ],
    actions: [
        {
            key: 'edit',
            label: 'Edit',
            colorClass: 'text-purple-600 hover:text-purple-900',
        },
        {
            key: 'delete',
            label: 'Delete',
            colorClass: 'text-red-600 hover:text-red-900',
        },
    ],
    emptyState: {
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        title: 'No users found',
        subtitle: 'Try adjusting your search or filters.',
    },
    showPagination: false,
    loadingText: 'Loading users...',
};
