import { PerfumeType, ScentFamily } from '@scentify/shared-types';
import { SelectOption } from '../types/form.types';

/**
 * Perfume type options for the form select
 * Maps PerfumeType enum values to user-friendly labels
 */
export const PERFUME_TYPE_OPTIONS: SelectOption[] = [
  { value: PerfumeType.PARFUM, label: 'Parfum (20-30%)' },
  { value: PerfumeType.EAU_DE_PARFUM, label: 'Eau de Parfum (15-20%)' },
  { value: PerfumeType.EAU_DE_TOILETTE, label: 'Eau de Toilette (5-15%)' },
  { value: PerfumeType.EAU_DE_COLOGNE, label: 'Eau de Cologne (2-5%)' },
  { value: PerfumeType.EAU_FRAICHE, label: 'Eau Fraîche (1-3%)' }
];

/**
 * Scent family options for the form select
 * Maps ScentFamily enum values to user-friendly labels
 */
export const SCENT_FAMILY_OPTIONS: SelectOption[] = [
  { value: ScentFamily.FLORAL, label: 'Floral' },
  { value: ScentFamily.WOODY, label: 'Woody' },
  { value: ScentFamily.ORIENTAL, label: 'Oriental' },
  { value: ScentFamily.FRESH, label: 'Fresh' },
  { value: ScentFamily.GOURMAND, label: 'Gourmand' },
  { value: ScentFamily.CHYPRE, label: 'Chypre' },
  { value: ScentFamily.FOUGERE, label: 'Fougère' }
];

/**
 * Gender options for the form select
 */
export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'unisex', label: 'Unisex' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];
