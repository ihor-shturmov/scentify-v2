import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { PerfumesStore } from '../../store/perfumes.store';
import { Perfume } from '@scentify/shared-types';
import { FormInputComponent } from '../../components/ui/form-input';
import { FormSelectComponent } from '../../components/ui/form-select';
import { FormTextareaComponent } from '../../components/ui/form-textarea';
import { FormTagInputComponent } from '../../components/ui/form-tag-input';
import { ImageUploadComponent } from '../../components/ui/image-upload';
import { PricingInventoryComponent } from '../../components/perfumes/pricing-inventory/pricing-inventory';
import {
  PERFUME_TYPE_OPTIONS,
  SCENT_FAMILY_OPTIONS,
  GENDER_OPTIONS
} from '../../constants/perfume-options';

@Component({
  selector: 'app-perfume-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormTagInputComponent,
    ImageUploadComponent,
    PricingInventoryComponent
  ],
  templateUrl: './perfume-form.html',
})
export class PerfumeFormComponent {
  private perfumesStore = inject(PerfumesStore);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  perfumeForm!: FormGroup;
  perfumeId: string | null = null;

  newTopNote = '';
  newMiddleNote = '';
  newBaseNote = '';

  // Select options using enum-based constants
  perfumeTypeOptions = PERFUME_TYPE_OPTIONS;
  scentFamilyOptions = SCENT_FAMILY_OPTIONS;
  genderOptions = GENDER_OPTIONS;

  constructor() {
    this.initializeForm();

    // Watch for route parameter changes
    effect(() => {
      const id = this.activatedRoute.snapshot.params['id'];
      if (id) {
        this.perfumeId = id;
      } else {
        // Creating new perfume - clear any existing data
        this.perfumeId = null;
        this.perfumesStore.clearSelectedPerfume();
        this.perfumeForm.reset({
          gender: 'unisex'
        });
      }
    });

    // Watch for selectedPerfume changes
    effect(() => {
      const perfume = this.perfumesStore.selectedPerfume();
      if (perfume && this.perfumeId) {
        this.patchFormWithPerfume(perfume);
      }
    });
  }

  private initializeForm(): void {
    this.perfumeForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      scentFamily: ['', Validators.required],
      gender: ['unisex'],
      description: [''],
      releaseDate: [''],
      fragranceNotes: this.fb.group({
        top: this.fb.array([]),
        middle: this.fb.array([]),
        base: this.fb.array([])
      }),
      sizes: [[]],  // Changed from FormArray to FormControl with empty array as initial value
      images: [[] as File[]]  // File array for upload
    });
  }

  private patchFormWithPerfume(perfume: Perfume): void {
    // Clear existing arrays
    this.topNotes.clear();
    this.middleNotes.clear();
    this.baseNotes.clear();

    // Extract and ensure values are strings for select fields
    const typeValue = String(perfume.type || '').trim();
    const scentFamilyValue = String(perfume.scentFamily || '').trim();
    const genderValue = String(perfume.gender || 'unisex').trim();

    // Patch basic fields
    const formValue = {
      name: perfume.name || '',
      brand: perfume.brand || '',
      type: typeValue,
      scentFamily: scentFamilyValue,
      gender: genderValue,
      description: perfume.description || '',
      releaseDate: perfume.releaseDate ? new Date(perfume.releaseDate).getFullYear() : null
    };

    this.perfumeForm.patchValue(formValue);

    // Add fragrance notes
    perfume.fragranceNotes?.top?.forEach(note => {
      this.topNotes.push(this.fb.control(note));
    });
    perfume.fragranceNotes?.middle?.forEach(note => {
      this.middleNotes.push(this.fb.control(note));
    });
    perfume.fragranceNotes?.base?.forEach(note => {
      this.baseNotes.push(this.fb.control(note));
    });

    // Patch sizes directly to the form control
    if (perfume.sizes) {
      this.perfumeForm.patchValue({ sizes: perfume.sizes });
    }

    // Patch images (existing URLs)
    if (perfume.images && perfume.images.length > 0) {
      this.perfumeForm.patchValue({ images: perfume.images });
    }
  }

  // Getters for form arrays
  get topNotes(): FormArray {
    return this.perfumeForm.get('fragranceNotes.top') as FormArray;
  }

  get middleNotes(): FormArray {
    return this.perfumeForm.get('fragranceNotes.middle') as FormArray;
  }

  get baseNotes(): FormArray {
    return this.perfumeForm.get('fragranceNotes.base') as FormArray;
  }

  addNote(type: 'top' | 'middle' | 'base', note?: string): void {
    if (!note) return;

    let formArray: FormArray;

    if (type === 'top') {
      formArray = this.topNotes;
    } else if (type === 'middle') {
      formArray = this.middleNotes;
    } else {
      formArray = this.baseNotes;
    }

    // Check if note contains commas - if so, split and add each separately
    if (note.includes(',')) {
      const notes = note.split(',').map(n => n.trim()).filter(n => n.length > 0);
      notes.forEach(n => formArray.push(this.fb.control(n)));
    } else {
      formArray.push(this.fb.control(note.trim()));
    }
  }

  removeNote(type: 'top' | 'middle' | 'base', index: number): void {
    if (type === 'top') {
      this.topNotes.removeAt(index);
    } else if (type === 'middle') {
      this.middleNotes.removeAt(index);
    } else if (type === 'base') {
      this.baseNotes.removeAt(index);
    }
  }

  onExistingImageRemoved(imageUrl: string): void {
    if (!this.perfumeId) return;

    this.perfumesStore.deleteImage({ perfumeId: this.perfumeId, imageUrl });
  }

  onSubmit(): void {
    if (this.perfumeForm.invalid) {
      this.perfumeForm.markAllAsTouched();
      return;
    }

    const formValue = this.perfumeForm.value;
    const images = formValue.images || [];

    this.perfumesStore.savePerfumeWithImages({
      perfumeData: formValue,
      perfumeId: this.perfumeId || undefined,
      images,
      onSuccess: () => {
        // Navigate to perfumes list after successful save
        this.router.navigate(['/perfumes']);
      }
    });
  }
}
