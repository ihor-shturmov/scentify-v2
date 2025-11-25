import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { PerfumesStore } from '../../store/perfumes.store';
import { Perfume } from '@scentify/shared-types';

@Component({
  selector: 'app-perfume-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfume-form.html',
})
export class PerfumeFormComponent {
  private perfumesStore = inject(PerfumesStore);

  perfume: Partial<Perfume> = {
    name: '',
    brand: '',
    type: undefined,
    scentFamily: undefined,
    gender: 'unisex',
    description: '',
    releaseDate: undefined,
    fragranceNotes: {
      top: [],
      middle: [],
      base: []
    },
    sizes: []
  };

  newTopNote = '';
  newMiddleNote = '';
  newBaseNote = '';

  perfumeId: string | null = null;

  constructor(private router: Router) {
    effect(() => {
      if (this.perfumesStore.selectedPerfume()) {
        this.perfume = this.perfumesStore.selectedPerfume()!;
        this.perfumeId = this.perfumesStore.selectedPerfume()!.id;
      }
    });
  }

  addNote(type: 'top' | 'middle' | 'base'): void {
    let note = '';
    if (type === 'top' && this.newTopNote.trim()) {
      note = this.newTopNote.trim();
      this.perfume.fragranceNotes?.top.push(note);
      this.newTopNote = '';
    } else if (type === 'middle' && this.newMiddleNote.trim()) {
      note = this.newMiddleNote.trim();
      this.perfume.fragranceNotes?.middle.push(note);
      this.newMiddleNote = '';
    } else if (type === 'base' && this.newBaseNote.trim()) {
      note = this.newBaseNote.trim();
      this.perfume.fragranceNotes?.base.push(note);
      this.newBaseNote = '';
    }
  }

  removeNote(type: 'top' | 'middle' | 'base', note: string): void {
    // if (type === 'top') {
    //   this.perfume.fragranceNotes?.top = this.perfume.fragranceNotes?.top.filter(n => n !== note);
    // } else if (type === 'middle') {
    //   this.perfume.fragranceNotes?.middle = this.perfume.fragranceNotes?.middle.filter(n => n !== note);
    // } else if (type === 'base') {
    //   this.perfume.fragranceNotes?.base = this.perfume.fragranceNotes?.base.filter(n => n !== note);
    // }
  }

  addSize(): void {
    this.perfume.sizes?.push({ volume: 50, price: 0, stock: 0 });
  }

  removeSize(index: number): void {
    this.perfume.sizes?.splice(index, 1);
  }

  onSubmit(): void {
    if (this.perfumeId) {
      this.perfumesStore.updatePerfume({
        id: this.perfumeId,
        data: this.perfume
      });
    } else {
      this.perfumesStore.createPerfume(this.perfume);
    }
    this.router.navigate(['/perfumes']);
  }
}
