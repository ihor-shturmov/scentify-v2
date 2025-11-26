import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumesStore } from '../../../store/perfumes.store';
import { Perfume } from '@scentify/shared-types';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="perfume-list-container">
      <div class="header">
        <h1>Perfume Management</h1>
        <button (click)="onCreateNew()" class="btn-primary">
          + Create New Perfume
        </button>
      </div>

      <!-- Loading State -->
      @if (store.isLoading()) {
        <div class="loading">Loading perfumes...</div>
      }

      <!-- Error State -->
      @if (store.error()) {
        <div class="error">
          <p>{{ store.error() }}</p>
          <button (click)="store.clearError()">Dismiss</button>
        </div>
      }

      <!-- Empty State -->
      @if (!store.isLoading() && !store.hasPerfumes()) {
        <div class="empty-state">
          <p>No perfumes found</p>
          <button (click)="onCreateNew()">Create your first perfume</button>
        </div>
      }

      <!-- Perfumes List -->
      @if (store.hasPerfumes()) {
        <div class="perfumes-grid">
          <div class="stats">
            <p>Total Perfumes: {{ store.perfumeCount() }}</p>
          </div>

          <div class="grid">
            @for (perfume of store.perfumes(); track perfume.id) {
              <div class="perfume-card">
                <div class="perfume-image">
                  @if (perfume.images && perfume.images.length > 0) {
                    <img [src]="perfume.images[0]" [alt]="perfume.name" />
                  } @else {
                    <div class="placeholder-image">No Image</div>
                  }
                </div>

                <div class="perfume-info">
                  <h3>{{ perfume.name }}</h3>
                  <p class="brand">{{ perfume.brand }}</p>
                  <p class="description">{{ perfume.description }}</p>

                  <div class="meta">
                    <span class="price">\${{ perfume.price }}</span>
                    <span class="rating">⭐ {{ perfume.rating }}</span>
                    <span class="reviews">({{ perfume.reviewCount }} reviews)</span>
                  </div>

                  <div class="tags">
                    <span class="tag">{{ perfume.scentFamily }}</span>
                    <span class="tag">{{ perfume.type }}</span>
                    <span class="tag">{{ perfume.gender }}</span>
                  </div>
                </div>

                <div class="actions">
                  <button (click)="onEdit(perfume)" class="btn-edit">
                    Edit
                  </button>
                  <button (click)="onDelete(perfume.id)" class="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .perfume-list-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 300;
      margin: 0;
    }

    .btn-primary {
      background: #000;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #333;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .error {
      background: #fee;
      border: 1px solid #fcc;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .error p {
      margin: 0;
      color: #c00;
    }

    .error button {
      background: transparent;
      border: 1px solid #c00;
      color: #c00;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-state p {
      color: #666;
      margin-bottom: 1rem;
    }

    .stats {
      margin-bottom: 1rem;
      color: #666;
      font-size: 0.875rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .perfume-card {
      border: 1px solid #e0e0e0;
      background: #fff;
      transition: box-shadow 0.2s;
    }

    .perfume-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .perfume-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: #f5f5f5;
    }

    .perfume-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 0.875rem;
    }

    .perfume-info {
      padding: 1.5rem;
    }

    .perfume-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 400;
    }

    .brand {
      color: #666;
      font-size: 0.875rem;
      margin: 0 0 0.75rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .description {
      color: #333;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .price {
      font-weight: 600;
      font-size: 1.125rem;
    }

    .rating {
      color: #666;
    }

    .reviews {
      color: #999;
      font-size: 0.75rem;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .tag {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #666;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      padding: 0 1.5rem 1.5rem 1.5rem;
    }

    .btn-edit,
    .btn-delete {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s;
    }

    .btn-edit:hover {
      background: #000;
      color: #fff;
      border-color: #000;
    }

    .btn-delete:hover {
      background: #c00;
      color: #fff;
      border-color: #c00;
    }
  `]
})
export class PerfumeListComponent implements OnInit {
  store = inject(PerfumesStore);

  ngOnInit() {
    // Load perfumes when component initializes
    this.store.loadPerfumes();
  }

  onCreateNew() {
    // Navigate to create form or open modal
    console.log('Create new perfume');
    // Example: this.router.navigate(['/perfumes/create']);
  }

  onEdit(perfume: Perfume) {
    // Select perfume and navigate to edit form
    this.store.selectPerfume(perfume);
    console.log('Edit perfume:', perfume.id);
    // Example: this.router.navigate(['/perfumes/edit', perfume.id]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this perfume?')) {
      this.store.deletePerfume(id);
    }
  }
}
