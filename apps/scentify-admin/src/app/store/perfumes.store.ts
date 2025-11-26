import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Perfume } from '@scentify/shared-types';
import { PerfumesService } from '../services/perfumes.service';
import { UploadService } from '../services/upload.service';

// State interface
interface PerfumesState {
    perfumes: Perfume[];
    selectedPerfume: Perfume | null;
    isLoading: boolean;
    error: string | null;
    uploadingImages: boolean;
}

// Initial state
const initialState: PerfumesState = {
    perfumes: [],
    selectedPerfume: null,
    isLoading: false,
    error: null,
    uploadingImages: false,
};

export const PerfumesStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ perfumes }) => ({
        perfumeCount: computed(() => perfumes().length),
        hasPerfumes: computed(() => perfumes().length > 0),
    })),
    withMethods((store, perfumesService = inject(PerfumesService), uploadService = inject(UploadService)) => ({
        // Load all perfumes
        loadPerfumes: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(() =>
                    perfumesService.getPerfumes().pipe(
                        tapResponse({
                            next: (perfumes) =>
                                patchState(store, { perfumes, isLoading: false }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Load single perfume
        loadPerfume: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) =>
                    perfumesService.getPerfume(id).pipe(
                        tapResponse({
                            next: (perfume) =>
                                patchState(store, { selectedPerfume: perfume, isLoading: false }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Create perfume
        createPerfume: rxMethod<Partial<Perfume>>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((perfumeData) =>
                    perfumesService.createPerfume(perfumeData).pipe(
                        tapResponse({
                            next: (newPerfume) =>
                                patchState(store, {
                                    perfumes: [...store.perfumes(), newPerfume],
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Update perfume
        updatePerfume: rxMethod<{ id: string; data: Partial<Perfume> }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ id, data }) =>
                    perfumesService.updatePerfume(id, data).pipe(
                        tapResponse({
                            next: (updatedPerfume) =>
                                patchState(store, {
                                    perfumes: store.perfumes().map((p) =>
                                        p.id === id ? updatedPerfume : p
                                    ),
                                    selectedPerfume:
                                        store.selectedPerfume()?.id === id
                                            ? updatedPerfume
                                            : store.selectedPerfume(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Delete perfume
        deletePerfume: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) =>
                    perfumesService.deletePerfume(id).pipe(
                        tapResponse({
                            next: () =>
                                patchState(store, {
                                    perfumes: store.perfumes().filter((p) => p.id !== id),
                                    selectedPerfume:
                                        store.selectedPerfume()?.id === id
                                            ? null
                                            : store.selectedPerfume(),
                                    isLoading: false,
                                }),
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Save perfume with images (create or update + upload images)
        savePerfumeWithImages: rxMethod<{
            perfumeData: Partial<Perfume>;
            perfumeId?: string;
            images: File[];
            onSuccess?: () => void
        }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ perfumeData, perfumeId, images, onSuccess }) => {
                    // Remove images from perfume data
                    const { images: _, ...dataWithoutImages } = perfumeData;

                    // Create or update perfume first
                    const saveOperation = perfumeId
                        ? perfumesService.updatePerfume(perfumeId, dataWithoutImages)
                        : perfumesService.createPerfume(dataWithoutImages);

                    return saveOperation.pipe(
                        switchMap((savedPerfume) => {
                            // If there are images, upload them
                            if (images && images.length > 0) {
                                patchState(store, { uploadingImages: true });
                                return uploadService.uploadPerfumeImages(savedPerfume.id, images).pipe(
                                    tapResponse({
                                        next: () => {
                                            patchState(store, {
                                                isLoading: false,
                                                uploadingImages: false,
                                            });
                                            if (onSuccess) onSuccess();
                                        },
                                        error: (error: Error) => {
                                            patchState(store, {
                                                error: `Perfume saved but image upload failed: ${error.message}`,
                                                isLoading: false,
                                                uploadingImages: false,
                                            });
                                            // Still call onSuccess since perfume was saved
                                            if (onSuccess) onSuccess();
                                        },
                                    })
                                );
                            } else {
                                // No images to upload
                                patchState(store, { isLoading: false });
                                if (onSuccess) onSuccess();
                                return [];
                            }
                        }),
                        tapResponse({
                            next: () => { },
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                    uploadingImages: false,
                                }),
                        })
                    );
                })
            )
        ),

        // Select perfume
        selectPerfume(perfume: Perfume | null) {
            patchState(store, { selectedPerfume: perfume });
        },

        // Clear error
        clearError() {
            patchState(store, { error: null });
        },

        // Upload images for perfume
        uploadImages: rxMethod<{ perfumeId: string; files: File[] }>(
            pipe(
                tap(() => patchState(store, { uploadingImages: true, error: null })),
                switchMap(({ perfumeId, files }) =>
                    uploadService.uploadPerfumeImages(perfumeId, files).pipe(
                        tapResponse({
                            next: (response) => {
                                // Update the perfume with new images
                                const updatedPerfumes = store.perfumes().map(p =>
                                    p.id === perfumeId
                                        ? { ...p, images: response.images }
                                        : p
                                );
                                const updatedSelectedPerfume = store.selectedPerfume()?.id === perfumeId
                                    ? { ...store.selectedPerfume()!, images: response.images }
                                    : store.selectedPerfume();

                                patchState(store, {
                                    perfumes: updatedPerfumes,
                                    selectedPerfume: updatedSelectedPerfume,
                                    uploadingImages: false,
                                });
                            },
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    uploadingImages: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Delete image from perfume
        deleteImage: rxMethod<{ perfumeId: string; imageUrl: string }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ perfumeId, imageUrl }) =>
                    uploadService.deletePerfumeImage(perfumeId, imageUrl).pipe(
                        tapResponse({
                            next: () => {
                                // Remove image from perfume
                                const updatedPerfumes = store.perfumes().map(p =>
                                    p.id === perfumeId
                                        ? { ...p, images: (p.images || []).filter(img => img !== imageUrl) }
                                        : p
                                );
                                const updatedSelectedPerfume = store.selectedPerfume()?.id === perfumeId
                                    ? {
                                        ...store.selectedPerfume()!,
                                        images: (store.selectedPerfume()!.images || []).filter(img => img !== imageUrl)
                                    }
                                    : store.selectedPerfume();

                                patchState(store, {
                                    perfumes: updatedPerfumes,
                                    selectedPerfume: updatedSelectedPerfume,
                                    isLoading: false,
                                });
                            },
                            error: (error: Error) =>
                                patchState(store, {
                                    error: error.message,
                                    isLoading: false,
                                }),
                        })
                    )
                )
            )
        ),

        // Reset store
        reset() {
            patchState(store, initialState);
        },
    }))
);
