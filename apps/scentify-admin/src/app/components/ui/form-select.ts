import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
    value: string;
    label: string;
}

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
      <label *ngIf="label" [for]="selectId" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      <select
        #selectElement
        [id]="selectId"
        [value]="value"
        (change)="onChange($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
        [class]="selectClasses"
      >
        <option value="" *ngIf="placeholder && placeholder.trim()">{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
      <p *ngIf="showError && errorMessage" class="mt-1 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  `
})
export class FormSelectComponent implements ControlValueAccessor, AfterViewInit {
    @Input() label = '';
    @Input() options: SelectOption[] = [];
    @Input() placeholder = 'Select an option';
    @Input() required = false;
    @Input() errorMessage = 'This field is required';
    @ViewChild('selectElement') selectElement?: ElementRef<HTMLSelectElement>;

    selectId = `select-${Math.random().toString(36).substring(2, 9)}`;
    value = '';
    disabled = false;
    touched = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onChangeFn: (value: string) => void = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouched: () => void = () => { };

    private cdr = inject(ChangeDetectorRef);

    ngAfterViewInit(): void {
        // Ensure the select element has the correct value after rendering
        if (this.selectElement && this.value) {
            this.selectElement.nativeElement.value = this.value;
        }
    }

    get selectClasses(): string {
        const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors';
        const errorClasses = this.showError ? 'border-red-500' : 'border-gray-300';
        const disabledClasses = this.disabled ? 'bg-gray-100 cursor-not-allowed' : '';

        return `${baseClasses} ${errorClasses} ${disabledClasses}`;
    }

    get showError(): boolean {
        return this.touched && this.required && !this.value;
    }

    onChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        this.value = select.value;
        this.onChangeFn(this.value);
    }

    writeValue(value: string | null | undefined): void {
        if (value !== null && value !== undefined && value !== '') {
            this.value = String(value).trim();
        } else {
            this.value = '';
        }
        // Sync the DOM element if it exists
        if (this.selectElement) {
            this.selectElement.nativeElement.value = this.value;
        }
        this.cdr.markForCheck();
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = () => {
            this.touched = true;
            fn();
        };
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
