import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PerfumesStore } from '../../store/perfumes.store';
import { FormatPerfumeTypePipe } from '../../pipes/format-perfume-type.pipe';

@Component({
  selector: 'app-perfume-list',
  imports: [CommonModule, RouterLink, FormatPerfumeTypePipe],
  templateUrl: './perfume-list.html',
})
export class PerfumeListComponent {
  private perfumeStore = inject(PerfumesStore);

  perfumes = this.perfumeStore.perfumes;

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Out of Stock': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  deletePerfume(id: string): void {
    if (window.confirm('Are you sure you want to delete this perfume?')) {
      this.perfumeStore.deletePerfume(id);
    }
  }
}
