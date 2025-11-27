import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true
        }
    ],
    template: `
    <div class="w-full">
      <label *ngIf="label" [for]="inputId" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [min]="min"
        [max]="max"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
        [class]="inputClasses"
      />
      <p *ngIf="showError && errorMessage" class="mt-1 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  `
})
export class FormInputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' = 'text';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() errorMessage = 'This field is required';
    @Input() min?: number;
    @Input() max?: number;

    inputId = `input-${Math.random().toString(36).substring(2, 9)}`;
    value = '';
    disabled = false;
    touched = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (value: string) => void = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouched: () => void = () => { };

    get inputClasses(): string {
        const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors';
        const errorClasses = this.showError ? 'border-red-500' : 'border-gray-300';
        const disabledClasses = this.disabled ? 'bg-gray-100 cursor-not-allowed' : '';

        return `${baseClasses} ${errorClasses} ${disabledClasses}`;
    }

    get showError(): boolean {
        return this.touched && this.required && !this.value;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    writeValue(value: string): void {
        this.value = value || '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
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
