import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PerfumesStore } from '../../store/perfumes.store';
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
export class PerfumeListComponent implements OnInit {
    private perfumeStore = inject(PerfumesStore);

    perfumes = this.perfumeStore.perfumes;
    pagination = this.perfumeStore.pagination;
    isLoading = this.perfumeStore.isLoading;

    // Filter state
    filterValues = signal<Record<string, string>>({});

    // Imported configurations
    readonly filterFields = PERFUME_FILTER_FIELDS;
    readonly tableConfig = PERFUME_TABLE_CONFIG;

    ngOnInit(): void {
        this.perfumeStore.loadPerfumes();
    }

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
        this.perfumeStore.loadPerfumes(page);
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
            this.perfumeStore.deletePerfume(id);
        }
    }
}
