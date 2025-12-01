/**
 * Dashboard-related type definitions
 */

export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    revenue: number;
    activeUsers: number;
}

export interface RecentOrder {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: 'Delivered' | 'Shipped' | 'Processing' | 'Pending' | 'Cancelled';
    date: string;
}
