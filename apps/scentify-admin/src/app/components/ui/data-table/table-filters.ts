import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FilterField } from './data-table.types';

@Component({
    selector: 'app-table-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @for (field of fields(); track field.key) {
                <div [class]="'col-span-' + (field.colSpan ?? 1)">
                    <label
                        [for]="'filter-' + field.key"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {{ field.label }}
                    </label>
                    @switch (field.type) {
                        @case ('select') {
                            <select
                                [id]="'filter-' + field.key"
                                [ngModel]="getFieldValue(field.key)"
                                (ngModelChange)="onFieldChange(field.key, $event)"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">{{ field.placeholder ?? 'All' }}</option>
                                @for (option of field.options; track option.value) {
                                    <option [value]="option.value">{{ option.label }}</option>
                                }
                            </select>
                        }
                        @default {
                            <input
                                type="text"
                                [id]="'filter-' + field.key"
                                [placeholder]="field.placeholder ?? ''"
                                [ngModel]="getFieldValue(field.key)"
                                (ngModelChange)="onFieldChange(field.key, $event)"
                                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        }
                    }
                </div>
            }
            @if (showClearButton() && hasActiveFilters()) {
                <div class="flex items-end">
                    <button
                        type="button"
                        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        (click)="onClear()"
                    >
                        Clear filters
                    </button>
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFiltersComponent {
    /** Filter field definitions */
    fields = input.required<FilterField[]>();

    /** Current filter values */
    values = input<Record<string, string>>({});

    /** Whether to show clear button */
    showClearButton = input<boolean>(true);

    /** Emits when a filter value changes */
    @Output() filterChange = new EventEmitter<{ key: string; value: string }>();

    /** Emits when all filters are cleared */
    @Output() clearFilters = new EventEmitter<void>();

    /** Get value for a field */
    getFieldValue(key: string): string {
        return this.values()[key] ?? '';
    }

    /** Check if any filters are active */
    hasActiveFilters(): boolean {
        const vals = this.values();
        return Object.values(vals).some((v) => v !== '' && v != null);
    }

    /** Handle field value change */
    onFieldChange(key: string, value: string): void {
        this.filterChange.emit({ key, value });
    }

    /** Handle clear all filters */
    onClear(): void {
        this.clearFilters.emit();
    }
}
