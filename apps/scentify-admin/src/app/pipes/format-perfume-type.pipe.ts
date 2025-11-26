import { Pipe, PipeTransform } from '@angular/core';
import { getPerfumeTypeLabel } from '@scentify/shared-utils';

@Pipe({
    name: 'formatPerfumeType',
    standalone: true
})
export class FormatPerfumeTypePipe implements PipeTransform {
    transform(value: string): string {
        return getPerfumeTypeLabel(value);
    }
}
