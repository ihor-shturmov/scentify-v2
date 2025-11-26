import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ProductSize {
    volume?: number;
    price?: number;
    stock?: number;
}

@Component({
    selector: 'app-pricing-inventory',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PricingInventoryComponent),
            multi: true
        }
    ],
    template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
      <div class="space-y-4" [formGroup]="formGroup">
        <div formArrayName="sizes">
          @for (sizeControl of sizesArray.controls; track $index; let i = $index) {
            <div class="flex gap-4 items-end" [formGroupName]="i">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Size (ml)</label>
                <input
                  type="number"
                  formControlName="volume"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  formControlName="price"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  formControlName="stock"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                (click)="removeSize(i)"
                class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          }
        </div>
        <button
          type="button"
          (click)="addSize()"
          class="text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          + Add Size Variant
        </button>
      </div>
    </div>
  `
})
export class PricingInventoryComponent implements ControlValueAccessor {
    private fb = new FormBuilder();

    formGroup: FormGroup;

    onChange: (value: ProductSize[]) => void = () => { };
    onTouched: () => void = () => { };

    constructor() {
        this.formGroup = this.fb.group({
            sizes: this.fb.array([])
        });

        // Subscribe to form changes
        this.formGroup.valueChanges.subscribe(value => {
            this.onChange(value.sizes);
            this.onTouched();
        });
    }

    get sizesArray(): FormArray {
        return this.formGroup.get('sizes') as FormArray;
    }

    addSize(): void {
        this.sizesArray.push(this.fb.group({
            volume: [50],
            price: [0],
            stock: [0]
        }));
    }

    removeSize(index: number): void {
        this.sizesArray.removeAt(index);
    }

    writeValue(sizes: ProductSize[]): void {
        this.sizesArray.clear();
        if (sizes && sizes.length > 0) {
            sizes.forEach(size => {
                this.sizesArray.push(this.fb.group({
                    volume: [size.volume || 50],
                    price: [size.price || 0],
                    stock: [size.stock || 0]
                }));
            });
        }
    }

    registerOnChange(fn: (value: ProductSize[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.formGroup.disable();
        } else {
            this.formGroup.enable();
        }
    }
}
