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

// State interface
interface PerfumesState {
    perfumes: Perfume[];
    selectedPerfume: Perfume | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: PerfumesState = {
    perfumes: [],
    selectedPerfume: null,
    isLoading: false,
    error: null,
};

export const PerfumesStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ perfumes }) => ({
        perfumeCount: computed(() => perfumes().length),
        hasPerfumes: computed(() => perfumes().length > 0),
    })),
    withMethods((store, perfumesService = inject(PerfumesService)) => ({
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

        // Select perfume
        selectPerfume(perfume: Perfume | null) {
            patchState(store, { selectedPerfume: perfume });
        },

        // Clear error
        clearError() {
            patchState(store, { error: null });
        },

        // Reset store
        reset() {
            patchState(store, initialState);
        },
    }))
);
