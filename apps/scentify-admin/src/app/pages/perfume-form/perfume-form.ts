import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { PerfumesStore } from '../../store/perfumes.store';
import { Perfume } from '@scentify/shared-types';

@Component({
  selector: 'app-perfume-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './perfume-form.html',
})
export class PerfumeFormComponent implements OnInit {
  private perfumesStore = inject(PerfumesStore);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  perfumeForm!: FormGroup;
  perfumeId: string | null = null;

  newTopNote = '';
  newMiddleNote = '';
  newBaseNote = '';

  constructor() {
    this.initializeForm();

    effect(() => {
      if (this.perfumesStore.selectedPerfume()) {
        const perfume = this.perfumesStore.selectedPerfume()!;
        this.perfumeId = perfume.id;
        this.patchFormWithPerfume(perfume);
      }
    });
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
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
      sizes: this.fb.array([])
    });
  }

  private patchFormWithPerfume(perfume: Perfume): void {
    // Clear existing arrays
    this.topNotes.clear();
    this.middleNotes.clear();
    this.baseNotes.clear();
    this.sizes.clear();

    // Patch basic fields
    this.perfumeForm.patchValue({
      name: perfume.name,
      brand: perfume.brand,
      type: perfume.type,
      scentFamily: perfume.scentFamily,
      gender: perfume.gender || 'unisex',
      description: perfume.description || '',
      releaseDate: perfume.releaseDate || ''
    });

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

    // Add sizes
    perfume.sizes?.forEach(size => {
      this.sizes.push(this.fb.group({
        volume: [size.volume],
        price: [size.price],
        stock: [size.stock || 0]
      }));
    });
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

  get sizes(): FormArray {
    return this.perfumeForm.get('sizes') as FormArray;
  }

  addNote(type: 'top' | 'middle' | 'base'): void {
    let note = '';
    let formArray: FormArray;

    if (type === 'top' && this.newTopNote.trim()) {
      note = this.newTopNote.trim();
      formArray = this.topNotes;
      this.newTopNote = '';
    } else if (type === 'middle' && this.newMiddleNote.trim()) {
      note = this.newMiddleNote.trim();
      formArray = this.middleNotes;
      this.newMiddleNote = '';
    } else if (type === 'base' && this.newBaseNote.trim()) {
      note = this.newBaseNote.trim();
      formArray = this.baseNotes;
      this.newBaseNote = '';
    } else {
      return;
    }

    formArray.push(this.fb.control(note));
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

  addSize(): void {
    this.sizes.push(this.fb.group({
      volume: [50],
      price: [0],
      stock: [0]
    }));
  }

  removeSize(index: number): void {
    this.sizes.removeAt(index);
  }

  onSubmit(): void {
    if (this.perfumeForm.invalid) {
      this.perfumeForm.markAllAsTouched();
      return;
    }

    const formValue = this.perfumeForm.value;

    if (this.perfumeId) {
      this.perfumesStore.updatePerfume({
        id: this.perfumeId,
        data: formValue
      });
    } else {
      this.perfumesStore.createPerfume(formValue);
    }
    this.router.navigate(['/perfumes']);
  }
}
