import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    input,
    output,
    signal,
    TemplateRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
    CellTemplateContext,
    SortDirection,
    SortState,
    TableColumn,
    TableConfig,
    TablePagination,
} from './data-table.types';

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './data-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends object> {
    /** Table data items */
    data = input.required<T[]>();

    /** Table configuration */
    config = input.required<TableConfig<T>>();

    /** Pagination state */
    pagination = input<TablePagination | null>(null);

    /** Loading state */
    loading = input<boolean>(false);

    /** Custom cell template */
    @ContentChild('cellTemplate') cellTemplate?: TemplateRef<CellTemplateContext<T>>;

    /** Page change event */
    pageChange = output<number>();

    /** Sort change event */
    sortChange = output<SortState>();

    /** Action click event */
    actionClick = output<{ action: string; item: T }>();

    /** Current sort state */
    sortState = signal<SortState>({ column: '', direction: null });

    /** Track function for ngFor */
    trackByFn = (index: number, item: T): unknown => {
        const cfg = this.config();
        const key = cfg.trackBy as keyof T;
        return item[key] ?? index;
    };

    /** Computed: page numbers to display */
    pageNumbers = computed(() => {
        const pag = this.pagination();
        const cfg = this.config();
        if (!pag) return [];

        const maxPages = cfg.maxPageNumbers ?? 5;
        const total = pag.totalPages;
        const current = pag.page;

        if (total <= maxPages) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const half = Math.floor(maxPages / 2);
        let start = Math.max(1, current - half);
        const end = Math.min(total, start + maxPages - 1);

        if (end - start + 1 < maxPages) {
            start = Math.max(1, end - maxPages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    /** Computed: showing from index */
    showingFrom = computed(() => {
        const pag = this.pagination();
        if (!pag || pag.total === 0) return 0;
        return (pag.page - 1) * pag.limit + 1;
    });

    /** Computed: showing to index */
    showingTo = computed(() => {
        const pag = this.pagination();
        if (!pag) return 0;
        return Math.min(pag.page * pag.limit, pag.total);
    });

    /** Get value from item by field path */
    getValue(item: T, column: TableColumn<T>): unknown {
        if (!column.field) return '';

        const path = String(column.field);
        const parts = path.split('.');
        let value: unknown = item;

        for (const part of parts) {
            if (value == null) return '';
            value = (value as Record<string, unknown>)[part];
        }

        return value;
    }

    /** Format value based on column type */
    formatValue(value: unknown, column: TableColumn<T>): string {
        if (value == null) return '';

        switch (column.type) {
            case 'boolean':
                return value ? 'Yes' : 'No';
            case 'currency': {
                const symbol = column.currencySymbol ?? '$';
                return `${symbol}${Number(value).toFixed(2)}`;
            }
            default:
                return String(value);
        }
    }

    /** Get value as string for pipes that require string type */
    getValueAsString(item: T, column: TableColumn<T>): string {
        const value = this.getValue(item, column);
        return value != null ? String(value) : '';
    }

    /** Get value as Date for date pipe */
    getValueAsDate(item: T, column: TableColumn<T>): Date | null {
        const value = this.getValue(item, column);
        if (value == null) return null;
        return value instanceof Date ? value : new Date(value as string | number);
    }

    /** Get badge classes for a value */
    getBadgeClasses(value: unknown, column: TableColumn<T>): string {
        const base =
            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset';
        const colorMap = column.badgeColors ?? {};
        const defaultColor =
            column.badgeDefaultColor ?? 'bg-gray-50 text-gray-700 ring-gray-600/20';

        const strValue = String(value).toLowerCase();
        const color = colorMap[strValue] ?? defaultColor;

        return `${base} ${color}`;
    }

    /** Handle column sort click */
    onSort(column: TableColumn<T>): void {
        if (!column.sortable) return;

        const current = this.sortState();
        let direction: SortDirection = 'asc';

        if (current.column === column.key) {
            if (current.direction === 'asc') {
                direction = 'desc';
            } else if (current.direction === 'desc') {
                direction = null;
            }
        }

        const newState: SortState = { column: column.key, direction };
        this.sortState.set(newState);
        this.sortChange.emit(newState);
    }

    /** Get sort icon classes */
    getSortIcon(column: TableColumn<T>): string {
        const state = this.sortState();
        if (state.column !== column.key || !state.direction) {
            return 'opacity-0 group-hover:opacity-50';
        }
        return state.direction === 'asc' ? 'rotate-180' : '';
    }

    /** Handle page change */
    onPageChange(page: number): void {
        const pag = this.pagination();
        if (!pag || page < 1 || page > pag.totalPages || page === pag.page) return;
        this.pageChange.emit(page);
    }

    /** Handle action click */
    onActionClick(action: string, item: T): void {
        this.actionClick.emit({ action, item });
    }

    /** Check if action is visible */
    isActionVisible(action: { visible?: (item: T) => boolean }, item: T): boolean {
        return action.visible ? action.visible(item) : true;
    }

    /** Check if action is disabled */
    isActionDisabled(action: { disabled?: (item: T) => boolean }, item: T): boolean {
        return action.disabled ? action.disabled(item) : false;
    }

    /** Get router link for action */
    getRouterLink(
        action: { routerLink?: (item: T) => string[] },
        item: T
    ): string[] | null {
        return action.routerLink ? action.routerLink(item) : null;
    }

    /** Get alignment class */
    getAlignClass(align?: 'left' | 'center' | 'right'): string {
        switch (align) {
            case 'center':
                return 'text-center';
            case 'right':
                return 'text-right';
            default:
                return 'text-left';
        }
    }
}
