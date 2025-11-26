import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface ImageFile {
    file: File;
    preview: string;
}

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploadComponent),
            multi: true
        }
    ],
    template: `
    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        @if (required) {
          <span class="text-red-500">*</span>
        }
      </label>

      <!-- Upload Area -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
        <input
          #fileInput
          type="file"
          multiple
          accept="image/*"
          (change)="onFileSelect($event)"
          class="hidden"
        />
        
        <button
          type="button"
          (click)="fileInput.click()"
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Choose Images
        </button>
        
        <p class="text-sm text-gray-500 mt-2">
          PNG, JPG, WebP up to 10MB each (max 10 images)
        </p>
      </div>

      <!-- Error Message -->
      @if (errorMessage) {
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>
      }

      <!-- Existing Images (URLs) -->
      @if (existingImages.length > 0) {
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">Existing Images</h4>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (imageUrl of existingImages; track imageUrl; let i = $index) {
              <div class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  [src]="imageUrl"
                  [alt]="'Existing image ' + (i + 1)"
                  class="w-full h-full object-cover"
                />
                <button
                  type="button"
                  (click)="removeExistingImage(i)"
                  class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
      }

      <!-- New Image Preview Grid -->
      @if (imageFiles.length > 0) {
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">New Images</h4>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (imageFile of imageFiles; track imageFile.preview; let i = $index) {
              <div class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  [src]="imageFile.preview"
                  [alt]="'New image ' + (i + 1)"
                  class="w-full h-full object-cover"
                />
                <button
                  type="button"
                  (click)="removeImage(i)"
                  class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {{ formatFileSize(imageFile.file.size) }}
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ImageUploadComponent implements ControlValueAccessor {
    @Input() label = 'Images';
    @Input() required = false;
    @Output() existingImageRemoved = new EventEmitter<string>();

    imageFiles: ImageFile[] = [];
    existingImages: string[] = [];
    errorMessage = '';

    onChange: (value: File[]) => void = () => { };
    onTouched: () => void = () => { };

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const files = Array.from(input.files);
        const totalImages = files.length + this.imageFiles.length + this.existingImages.length;

        // Validate file count
        if (totalImages > 10) {
            this.errorMessage = 'Maximum 10 images allowed';
            return;
        }

        // Validate file sizes
        const maxSize = 10 * 1024 * 1024; // 10MB
        const oversizedFiles = files.filter(f => f.size > maxSize);
        if (oversizedFiles.length > 0) {
            this.errorMessage = 'Some files exceed 10MB limit';
            return;
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const invalidFiles = files.filter(f => !validTypes.includes(f.type));
        if (invalidFiles.length > 0) {
            this.errorMessage = 'Only JPEG, PNG, and WebP images are allowed';
            return;
        }

        this.errorMessage = '';

        // Create preview URLs
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageFiles.push({
                    file,
                    preview: e.target?.result as string
                });
                this.emitChange();
            };
            reader.readAsDataURL(file);
        });

        // Reset input
        input.value = '';
    }

    removeExistingImage(index: number): void {
        const imageUrl = this.existingImages[index];
        this.existingImages = this.existingImages.filter((_, i) => i !== index);
        this.existingImageRemoved.emit(imageUrl);
    }

    removeImage(index: number): void {
        // Revoke object URL to prevent memory leaks
        const imageFile = this.imageFiles[index];
        if (imageFile.preview.startsWith('blob:')) {
            URL.revokeObjectURL(imageFile.preview);
        }

        this.imageFiles = this.imageFiles.filter((_, i) => i !== index);
        this.emitChange();
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    private emitChange(): void {
        const files = this.imageFiles.map(img => img.file);
        this.onChange(files);
        this.onTouched();
    }

    writeValue(value: (File | string)[] | null): void {
        if (!value || value.length === 0) {
            this.imageFiles = [];
            this.existingImages = [];
            return;
        }

        // Separate existing URLs from new files
        this.existingImages = value.filter((v): v is string => typeof v === 'string');
        
        // Handle File objects if any
        const files = value.filter((v): v is File => v instanceof File);
        if (files.length > 0) {
            this.imageFiles = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageFiles.push({
                        file,
                        preview: e.target?.result as string
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    registerOnChange(fn: (value: File[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // Handle disabled state if needed
    }
}
