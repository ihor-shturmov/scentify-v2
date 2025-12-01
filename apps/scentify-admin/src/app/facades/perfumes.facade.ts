import { Injectable, inject, computed } from '@angular/core';
import { PerfumesStore } from '../store/perfumes.store';
import { Perfume } from '@scentify/shared-types';

/**
 * Facade service for perfume-related operations.
 * Provides an abstraction layer between components and the PerfumesStore.
 */
@Injectable({
    providedIn: 'root'
})
export class PerfumesFacade {
    private readonly store = inject(PerfumesStore);

    // State signals
    readonly perfumes = this.store.perfumes;
    readonly selectedPerfume = this.store.selectedPerfume;
    readonly isLoading = this.store.isLoading;
    readonly error = this.store.error;
    readonly uploadingImages = this.store.uploadingImages;
    readonly pagination = this.store.pagination;

    // Computed signals
    readonly perfumeCount = this.store.perfumeCount;
    readonly hasPerfumes = this.store.hasPerfumes;

    // Additional computed values
    readonly currentPage = computed(() => this.pagination().page);
    readonly totalPages = computed(() => this.pagination().totalPages);
    readonly hasNextPage = computed(() => this.pagination().page < this.pagination().totalPages);
    readonly hasPreviousPage = computed(() => this.pagination().page > 1);

    /**
     * Load perfumes with optional page number
     */
    loadPerfumes(page?: number): void {
        this.store.loadPerfumes(page);
    }

    /**
     * Load a single perfume by ID
     */
    loadPerfume(id: string): void {
        this.store.loadPerfume(id);
    }

    /**
     * Create a new perfume
     */
    createPerfume(perfumeData: Partial<Perfume>): void {
        this.store.createPerfume(perfumeData);
    }

    /**
     * Update an existing perfume
     */
    updatePerfume(id: string, data: Partial<Perfume>): void {
        this.store.updatePerfume({ id, data });
    }

    /**
     * Delete a perfume
     */
    deletePerfume(id: string): void {
        this.store.deletePerfume(id);
    }

    /**
     * Save perfume with images (create or update)
     */
    savePerfumeWithImages(params: {
        perfumeData: Partial<Perfume>;
        perfumeId?: string;
        images: File[];
        onSuccess?: () => void;
    }): void {
        this.store.savePerfumeWithImages(params);
    }

    /**
     * Upload images for a perfume
     */
    uploadImages(perfumeId: string, files: File[]): void {
        this.store.uploadImages({ perfumeId, files });
    }

    /**
     * Delete an image from a perfume
     */
    deleteImage(perfumeId: string, imageUrl: string): void {
        this.store.deleteImage({ perfumeId, imageUrl });
    }

    /**
     * Select a perfume
     */
    selectPerfume(perfume: Perfume | null): void {
        this.store.selectPerfume(perfume);
    }

    /**
     * Clear the selected perfume
     */
    clearSelectedPerfume(): void {
        this.store.clearSelectedPerfume();
    }

    /**
     * Clear any error messages
     */
    clearError(): void {
        this.store.clearError();
    }

    /**
     * Reset the store to initial state
     */
    reset(): void {
        this.store.reset();
    }

    /**
     * Navigate to next page
     */
    nextPage(): void {
        if (this.hasNextPage()) {
            this.loadPerfumes(this.currentPage() + 1);
        }
    }

    /**
     * Navigate to previous page
     */
    previousPage(): void {
        if (this.hasPreviousPage()) {
            this.loadPerfumes(this.currentPage() - 1);
        }
    }

    /**
     * Go to a specific page
     */
    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages()) {
            this.loadPerfumes(page);
        }
    }
}
