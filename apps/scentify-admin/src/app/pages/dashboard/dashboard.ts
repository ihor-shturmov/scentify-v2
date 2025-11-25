import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  stats = {
    totalProducts: 156,
    totalOrders: 1243,
    revenue: 45678,
    activeUsers: 892
  };

  recentOrders = [
    { id: '1001', customer: 'John Doe', product: 'Chanel No. 5', amount: 120, status: 'Delivered', date: '2024-11-20' },
    { id: '1002', customer: 'Jane Smith', product: 'Dior Sauvage', amount: 95, status: 'Shipped', date: '2024-11-21' },
    { id: '1003', customer: 'Bob Johnson', product: 'Tom Ford Oud Wood', amount: 250, status: 'Processing', date: '2024-11-22' },
    { id: '1004', customer: 'Alice Brown', product: 'Creed Aventus', amount: 350, status: 'Pending', date: '2024-11-23' },
    { id: '1005', customer: 'Charlie Wilson', product: 'YSL Black Opium', amount: 110, status: 'Delivered', date: '2024-11-23' },
  ];

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'Delivered': 'bg-green-100 text-green-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
}
