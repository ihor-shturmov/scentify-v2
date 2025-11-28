/**
 * Sort direction for table columns
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * Sort state for the table
 */
export interface SortState {
    column: string;
    direction: SortDirection;
}

/**
 * Column definition for the data table
 */
export interface TableColumn<T> {
    /** Unique key identifier for the column */
    key: string;

    /** Header text to display */
    header: string;

    /** Property path to access data (supports nested: 'user.name') */
    field?: keyof T | string;

    /** Text alignment */
    align?: 'left' | 'center' | 'right';

    /** Whether column is sortable */
    sortable?: boolean;

    /** Cell type for built-in formatting */
    type?: 'text' | 'date' | 'currency' | 'badge' | 'boolean';

    /** Date format for date type columns (Angular date pipe format) */
    dateFormat?: string;

    /** Currency symbol for currency type */
    currencySymbol?: string;

    /** Badge color mapping: value -> tailwind classes */
    badgeColors?: Record<string, string>;

    /** Default badge color if value not in badgeColors */
    badgeDefaultColor?: string;

    /** Whether to hide on mobile (sm breakpoint) */
    hideOnMobile?: boolean;

    /** Whether to capitalize the value */
    capitalize?: boolean;
}

/**
 * Row action definition
 */
export interface TableAction<T> {
    /** Unique key identifier */
    key: string;

    /** Display label */
    label: string;

    /** CSS classes for styling */
    colorClass?: string;

    /** Whether action is a router link */
    isRouterLink?: boolean;

    /** Route path generator (for router links) */
    routerLink?: (item: T) => string[];

    /** Condition to show/hide action */
    visible?: (item: T) => boolean;

    /** Condition to enable/disable action */
    disabled?: (item: T) => boolean;
}

/**
 * Pagination state
 */
export interface TablePagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

/**
 * Empty state configuration
 */
export interface EmptyStateConfig {
    /** SVG icon (the d path for the icon) */
    icon?: string;

    /** Main title text */
    title: string;

    /** Subtitle or description */
    subtitle?: string;

    /** Optional action button */
    action?: {
        label: string;
        routerLink?: string[];
    };
}

/**
 * Filter field definition
 */
export interface FilterField {
    /** Unique key identifier */
    key: string;

    /** Label for the filter */
    label: string;

    /** Filter type */
    type: 'text' | 'select';

    /** Placeholder text */
    placeholder?: string;

    /** Options for select type */
    options?: Array<{ value: string; label: string }>;

    /** Column span (1-4) */
    colSpan?: number;
}

/**
 * Main table configuration
 */
export interface TableConfig<T> {
    /** Unique identifier field on data items */
    trackBy: keyof T;

    /** Column definitions */
    columns: TableColumn<T>[];

    /** Row actions */
    actions?: TableAction<T>[];

    /** Empty state configuration */
    emptyState?: EmptyStateConfig;

    /** Whether to show pagination */
    showPagination?: boolean;

    /** Maximum visible page numbers */
    maxPageNumbers?: number;

    /** Loading text */
    loadingText?: string;
}

/**
 * Cell template context for ng-template
 */
export interface CellTemplateContext<T> {
    $implicit: T;
    item: T;
    column: TableColumn<T>;
    value: unknown;
}
