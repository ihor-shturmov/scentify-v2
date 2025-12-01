import { Component, input, forwardRef, signal } from '@angular/core';
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
      @if (label()) {
        <label [for]="textareaId" class="block text-sm font-medium text-gray-700 mb-2">
          {{ label() }}
          @if (required()) {
            <span class="text-red-500">*</span>
          }
        </label>
      }
      <textarea
        [id]="textareaId"
        [placeholder]="placeholder()"
        [rows]="rows()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled()"
        [class]="textareaClasses()"
      ></textarea>
      @if (showError()) {
        <p class="mt-1 text-sm text-red-600">
          {{ errorMessage() }}
        </p>
      }
    </div>
  `
})
export class FormTextareaComponent implements ControlValueAccessor {
    label = input('');
    placeholder = input('');
    rows = input(4);
    required = input(false);
    errorMessage = input('This field is required');

    textareaId = `textarea-${Math.random().toString(36).substring(2, 9)}`;
    value = signal('');
    disabled = signal(false);
    touched = signal(false);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (value: string) => void = () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouchedFn: () => void = () => { };

    textareaClasses = signal('');
    showError = signal(false);

    constructor() {
        this.updateTextareaClasses();
    }

    private updateTextareaClasses(): void {
        const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-y';
        const errorClasses = this.showError() ? 'border-red-500' : 'border-gray-300';
        const disabledClasses = this.disabled() ? 'bg-gray-100 cursor-not-allowed' : '';

        this.textareaClasses.set(`${baseClasses} ${errorClasses} ${disabledClasses}`);
    }

    private updateShowError(): void {
        this.showError.set(this.touched() && this.required() && !this.value());
        this.updateTextareaClasses();
    }

    onInput(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        this.value.set(textarea.value);
        this.onChange(this.value());
        this.updateShowError();
    }

    onTouched(): void {
        this.touched.set(true);
        this.onTouchedFn();
        this.updateShowError();
    }

    writeValue(value: string): void {
        this.value.set(value || '');
        this.updateShowError();
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
        this.updateTextareaClasses();
    }
}
