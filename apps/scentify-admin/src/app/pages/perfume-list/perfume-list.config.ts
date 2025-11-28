import { FilterField, TableConfig } from '../../components/ui/data-table';
import { Perfume } from '@scentify/shared-types';

export const PERFUME_FILTER_FIELDS: FilterField[] = [
    {
        key: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search perfumes...',
        colSpan: 2,
    },
    {
        key: 'scentFamily',
        label: 'Scent Family',
        type: 'select',
        placeholder: 'All Scent Families',
        options: [
            { value: 'floral', label: 'Floral' },
            { value: 'woody', label: 'Woody' },
            { value: 'oriental', label: 'Oriental' },
            { value: 'fresh', label: 'Fresh' },
            { value: 'gourmand', label: 'Gourmand' },
        ],
    },
];

export const PERFUME_TABLE_CONFIG: TableConfig<Perfume> = {
    trackBy: 'id',
    columns: [
        { key: 'product', header: 'Product', field: 'name' },
        { key: 'brand', header: 'Brand', field: 'brand' },
        { key: 'type', header: 'Type', field: 'type', sortable: true },
        {
            key: 'scentFamily',
            header: 'Scent Family',
            field: 'scentFamily',
            type: 'badge',
            capitalize: true,
            badgeColors: {
                floral: 'bg-pink-50 text-pink-700 ring-pink-600/20',
                woody: 'bg-amber-50 text-amber-700 ring-amber-600/20',
                oriental: 'bg-orange-50 text-orange-700 ring-orange-600/20',
                fresh: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
                gourmand: 'bg-rose-50 text-rose-700 ring-rose-600/20',
            },
            badgeDefaultColor: 'bg-purple-50 text-purple-700 ring-purple-600/20',
            sortable: true,
        },
        {
            key: 'price',
            header: 'Price',
            field: 'price',
            type: 'currency',
            align: 'right',
            sortable: true,
        },
    ],
    actions: [
        {
            key: 'edit',
            label: 'Edit',
            isRouterLink: true,
            routerLink: (item: Perfume) => ['/perfumes', item.id, 'edit'],
            colorClass: 'text-purple-600 hover:text-purple-900',
        },
        {
            key: 'delete',
            label: 'Delete',
            colorClass: 'text-red-600 hover:text-red-900',
        },
    ],
    emptyState: {
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
        title: 'No perfumes found',
        subtitle: 'Get started by adding your first perfume',
        action: {
            label: 'Add Perfume',
            routerLink: ['/perfumes', 'new'],
        },
    },
    showPagination: true,
    maxPageNumbers: 5,
    loadingText: 'Loading perfumes...',
};
