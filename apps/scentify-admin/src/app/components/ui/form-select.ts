import { Component, input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../types/form.types';

@Component({
    selector: 'app-form-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectComponent),
            multi: true
        }
    ],
    template: `
    <div class="w-full">
      @if (label()) {
        <label [for]="selectId" class="block text-sm font-medium text-gray-700 mb-2">
          {{ label() }}
          @if (required()) {
            <span class="text-red-500">*</span>
          }
        </label>
      }
      <select
        #selectElement
        [id]="selectId"
        [value]="value()"
        (change)="onChange($event)"
        (blur)="onTouched()"
        [disabled]="disabled()"
        [class]="selectClasses()"
      >
        @if (placeholder() && placeholder().trim()) {
          <option value="">{{ placeholder() }}</option>
        }
        @for (option of options(); track option.value) {
          <option [value]="option.value">
            {{ option.label }}
          </option>
        }
      </select>
      @if (showError()) {
        <p class="mt-1 text-sm text-red-600">
          {{ errorMessage() }}
        </p>
      }
    </div>
  `
})
export class FormSelectComponent implements ControlValueAccessor, AfterViewInit {
    label = input('');
    options = input<SelectOption[]>([]);
    placeholder = input('Select an option');
    required = input(false);
    errorMessage = input('This field is required');
    @ViewChild('selectElement') selectElement?: ElementRef<HTMLSelectElement>;

    selectId = `select-${Math.random().toString(36).substring(2, 9)}`;
    value = signal('');
    disabled = signal(false);
    touched = signal(false);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onChangeFn: (value: string) => void = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouchedFn: () => void = () => { };

    private cdr = inject(ChangeDetectorRef);

    selectClasses = signal('');
    showError = signal(false);

    constructor() {
        this.updateSelectClasses();
    }

    ngAfterViewInit(): void {
        // Ensure the select element has the correct value after rendering
        if (this.selectElement && this.value()) {
            this.selectElement.nativeElement.value = this.value();
        }
    }

    private updateSelectClasses(): void {
        const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors';
        const errorClasses = this.showError() ? 'border-red-500' : 'border-gray-300';
        const disabledClasses = this.disabled() ? 'bg-gray-100 cursor-not-allowed' : '';

        this.selectClasses.set(`${baseClasses} ${errorClasses} ${disabledClasses}`);
    }

    private updateShowError(): void {
        this.showError.set(this.touched() && this.required() && !this.value());
        this.updateSelectClasses();
    }

    onChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.value.set(select.value);
        this.onChangeFn(this.value());
        this.updateShowError();
    }

    onTouched(): void {
        this.touched.set(true);
        this.onTouchedFn();
        this.updateShowError();
    }

    writeValue(value: string | null | undefined): void {
        if (value !== null && value !== undefined && value !== '') {
            this.value.set(String(value).trim());
        } else {
            this.value.set('');
        }
        // Sync the DOM element if it exists
        if (this.selectElement) {
            this.selectElement.nativeElement.value = this.value();
        }
        this.cdr.markForCheck();
        this.updateShowError();
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
        this.updateSelectClasses();
    }
}
