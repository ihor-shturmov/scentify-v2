import type { PerfumeType } from '@scentify/shared-types';

export * from './lib/utils.js';

// Perfume Type Labels
export const PERFUME_TYPE_LABELS: Record<string, string> = {
    'parfum': 'Parfum',
    'eau_de_parfum': 'Eau de Parfum',
    'eau_de_toilette': 'Eau de Toilette',
    'eau_de_cologne': 'Eau de Cologne',
    'eau_fraiche': 'Eau Fraîche',
};

// Get label for perfume type
export function getPerfumeTypeLabel(type: PerfumeType | string): string {
    return PERFUME_TYPE_LABELS[type] || type;
}
