import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-tag-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="w-full">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
      </label>
      
      <!-- Input Section -->
      <div class="flex gap-2 mb-2">
        <input
          type="text"
          [(ngModel)]="inputValue"
          [placeholder]="placeholder"
          (keydown.enter)="onAdd($event)"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="button"
          (click)="onAdd($event)"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>

      <!-- Tags Display -->
      <div class="flex flex-wrap gap-2">
        <span
          *ngFor="let tag of tags; let i = index"
          [class]="getTagClasses()"
        >
          {{ tag }}
          <button
            type="button"
            (click)="onRemove(i)"
            [class]="getRemoveButtonClasses()"
          >
            ×
          </button>
        </span>
      </div>
    </div>
  `
})
export class FormTagInputComponent {
    @Input() label = '';
    @Input() placeholder = 'Add item...';
    @Input() tags: string[] = [];
    @Input() tagColor: 'purple' | 'pink' | 'amber' = 'purple';

    @Output() tagAdded = new EventEmitter<string>();
    @Output() tagRemoved = new EventEmitter<number>();

    inputValue = '';

    onAdd(event: Event): void {
        event.preventDefault();

        if (this.inputValue.trim()) {
            this.tagAdded.emit(this.inputValue.trim());
            this.inputValue = '';
        }
    }

    onRemove(index: number): void {
        this.tagRemoved.emit(index);
    }

    getTagClasses(): string {
        const colorMap = {
            purple: 'bg-purple-100 text-purple-800 hover:text-purple-900',
            pink: 'bg-pink-100 text-pink-800 hover:text-pink-900',
            amber: 'bg-amber-100 text-amber-800 hover:text-amber-900'
        };

        return `${colorMap[this.tagColor]} px-3 py-1 rounded-full text-sm flex items-center gap-2`;
    }

    getRemoveButtonClasses(): string {
        return 'hover:font-bold transition-all';
    }
}
