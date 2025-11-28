import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PerfumesStore } from '../../store/perfumes.store';
import { FormatPerfumeTypePipe } from '../../pipes/format-perfume-type.pipe';

@Component({
  selector: 'app-perfume-list',
  imports: [CommonModule, RouterLink, FormatPerfumeTypePipe],
  templateUrl: './perfume-list.html',
})
export class PerfumeListComponent implements OnInit {
  private perfumeStore = inject(PerfumesStore);

  perfumes = this.perfumeStore.perfumes;
  pagination = this.perfumeStore.pagination;
  isLoading = this.perfumeStore.isLoading;

  ngOnInit(): void {
    this.perfumeStore.loadPerfumes();
  }

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

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination().totalPages) {
      this.perfumeStore.loadPerfumes(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.pagination().totalPages;
    const currentPage = this.pagination().page;
    const pages: number[] = [];

    // Show max 5 page numbers
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showingFrom(): number {
    return (this.pagination().page - 1) * this.pagination().limit + 1;
  }

  get showingTo(): number {
    return Math.min(this.pagination().page * this.pagination().limit, this.pagination().total);
  }
}
