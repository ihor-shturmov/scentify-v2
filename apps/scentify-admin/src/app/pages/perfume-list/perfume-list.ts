import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PerfumesFacade } from '../../facades/perfumes.facade';
import { FormatPerfumeTypePipe } from '../../pipes/format-perfume-type.pipe';
import {
    DataTableComponent,
    TableFiltersComponent,
    SortState,
} from '../../components/ui/data-table';
import { Perfume } from '@scentify/shared-types';
import { PERFUME_FILTER_FIELDS, PERFUME_TABLE_CONFIG } from './perfume-list.config';

@Component({
    selector: 'app-perfume-list',
    imports: [
        CommonModule,
        RouterLink,
        FormatPerfumeTypePipe,
        DataTableComponent,
        TableFiltersComponent,
    ],
    templateUrl: './perfume-list.html',
})
export class PerfumeListComponent {
    private perfumeFacade = inject(PerfumesFacade);

    perfumes = this.perfumeFacade.perfumes;
    pagination = this.perfumeFacade.pagination;
    isLoading = this.perfumeFacade.isLoading;

    // Filter state
    filterValues = signal<Record<string, string>>({});

    // Imported configurations
    readonly filterFields = PERFUME_FILTER_FIELDS;
    readonly tableConfig = PERFUME_TABLE_CONFIG;



    onFilterChange(event: { key: string; value: string }): void {
        this.filterValues.update((current) => ({
            ...current,
            [event.key]: event.value,
        }));
        // TODO: Implement server-side filtering
    }

    onClearFilters(): void {
        this.filterValues.set({});
    }

    onPageChange(page: number): void {
        this.perfumeFacade.loadPerfumes(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onSortChange(sort: SortState): void {
        console.log('Sort changed:', sort);
        // TODO: Implement server-side sorting
    }

    onActionClick(event: { action: string; item: Perfume }): void {
        if (event.action === 'delete') {
            this.deletePerfume(event.item.id);
        }
    }

    deletePerfume(id: string): void {
        if (window.confirm('Are you sure you want to delete this perfume?')) {
            this.perfumeFacade.deletePerfume(id);
        }
    }
}
