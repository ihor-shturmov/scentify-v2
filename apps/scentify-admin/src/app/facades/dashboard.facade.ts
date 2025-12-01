import { Injectable, inject } from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';
import { RecentOrder } from '../types/dashboard.types';

/**
 * Facade service for dashboard-related operations.
 * Provides an abstraction layer between components and the DashboardStore.
 */
@Injectable({
    providedIn: 'root'
})
export class DashboardFacade {
    private readonly store = inject(DashboardStore);

    // Computed signals
    readonly stats = this.store.stats;
    readonly recentOrders = this.store.recentOrders;
    readonly isLoading = this.store.isLoading;
    readonly hasData = this.store.hasData;
    readonly perfumesLoading = this.store.perfumesLoading;
    readonly usersLoading = this.store.usersLoading;

    /**
     * Update mocked revenue (for future use when real data is available)
     */
    updateMockedRevenue(revenue: number): void {
        this.store.updateMockedRevenue(revenue);
    }

    /**
     * Update mocked order count (for future use when real data is available)
     */
    updateMockedOrderCount(count: number): void {
        this.store.updateMockedOrderCount(count);
    }

    /**
     * Add a mocked order (for future use when real data is available)
     */
    addMockedOrder(order: RecentOrder): void {
        this.store.addMockedOrder(order);
    }

    /**
     * Reset mocked data to initial state
     */
    resetMockedData(): void {
        this.store.resetMockedData();
    }
}
