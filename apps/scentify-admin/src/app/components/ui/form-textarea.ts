import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-textarea',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormTextareaComponent),
            multi: true
        }
    ],
    template: `
    <div class="w-full">
      <label *ngIf="label" [for]="textareaId" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      <textarea
        [id]="textareaId"
        [placeholder]="placeholder"
        [rows]="rows"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
        [class]="textareaClasses"
      ></textarea>
      <p *ngIf="showError && errorMessage" class="mt-1 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  `
})
export class FormTextareaComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() rows = 4;
    @Input() required = false;
    @Input() errorMessage = 'This field is required';

    textareaId = `textarea-${Math.random().toString(36).substring(2, 9)}`;
    value = '';
    disabled = false;
    touched = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (value: string) => void = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouched: () => void = () => { };

    get textareaClasses(): string {
        const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-y';
        const errorClasses = this.showError ? 'border-red-500' : 'border-gray-300';
        const disabledClasses = this.disabled ? 'bg-gray-100 cursor-not-allowed' : '';

        return `${baseClasses} ${errorClasses} ${disabledClasses}`;
    }

    get showError(): boolean {
        return this.touched && this.required && !this.value;
    }

    onInput(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        this.value = textarea.value;
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
