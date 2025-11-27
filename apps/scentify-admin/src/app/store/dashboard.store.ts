import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { PerfumesStore } from './perfumes.store';
import { UsersStore } from './users.store';

// Dashboard statistics interface
export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    revenue: number;
    activeUsers: number;
}

// Recent order interface
export interface RecentOrder {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';
    date: string;
}

// State interface
interface DashboardState {
    // Mocked data (will be replaced when order management is implemented)
    mockedOrders: RecentOrder[];
    mockedRevenue: number;
    mockedOrderCount: number;
}

// Initial state with mocked data
const initialState: DashboardState = {
    mockedRevenue: 45678,
    mockedOrderCount: 1243,
    mockedOrders: [
        {
            id: '1001',
            customer: 'John Doe',
            product: 'Chanel No. 5',
            amount: 120,
            status: 'Delivered',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '1002',
            customer: 'Jane Smith',
            product: 'Dior Sauvage',
            amount: 95,
            status: 'Shipped',
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '1003',
            customer: 'Bob Johnson',
            product: 'Tom Ford Oud Wood',
            amount: 250,
            status: 'Processing',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '1004',
            customer: 'Alice Brown',
            product: 'Creed Aventus',
            amount: 350,
            status: 'Pending',
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '1005',
            customer: 'Charlie Wilson',
            product: 'YSL Black Opium',
            amount: 110,
            status: 'Delivered',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
    ],
};

export const DashboardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state, perfumesStore = inject(PerfumesStore), usersStore = inject(UsersStore)) => ({
        // Combined statistics from real and mocked data
        stats: computed((): DashboardStats => ({
            totalProducts: perfumesStore.perfumeCount(),
            totalOrders: state.mockedOrderCount(),
            revenue: state.mockedRevenue(),
            activeUsers: usersStore.activeUserCount(),
        })),

        // Recent orders (currently mocked)
        recentOrders: computed(() => state.mockedOrders()),

        // Loading state from dependent stores
        isLoading: computed(() =>
            perfumesStore.isLoading() || usersStore.isLoading()
        ),

        // Whether we have data available
        hasData: computed(() =>
            perfumesStore.hasPerfumes() || usersStore.hasUsers()
        ),

        // Individual store states for debugging
        perfumesLoading: computed(() => perfumesStore.isLoading()),
        usersLoading: computed(() => usersStore.isLoading()),
    })),
    withMethods((store) => ({
        // Method to update mocked revenue (for future use)
        updateMockedRevenue(revenue: number) {
            patchState(store, { mockedRevenue: revenue });
        },

        // Method to update mocked order count (for future use)
        updateMockedOrderCount(count: number) {
            patchState(store, { mockedOrderCount: count });
        },

        // Method to add a mocked order (for future use)
        addMockedOrder(order: RecentOrder) {
            const currentOrders = store.mockedOrders();
            const updatedOrders = [order, ...currentOrders].slice(0, 5); // Keep only 5 most recent
            patchState(store, { mockedOrders: updatedOrders });
        },

        // Reset mocked data to initial state
        resetMockedData() {
            patchState(store, {
                mockedRevenue: initialState.mockedRevenue,
                mockedOrderCount: initialState.mockedOrderCount,
                mockedOrders: initialState.mockedOrders,
            });
        },
    }))
);
