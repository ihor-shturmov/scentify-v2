import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardFacade } from '../../facades/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private readonly dashboardFacade = inject(DashboardFacade);

  // Expose store signals
  stats = this.dashboardFacade.stats;
  recentOrders = this.dashboardFacade.recentOrders;
  isLoading = this.dashboardFacade.isLoading;

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
