import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
    message: string;
    images: string[];
    totalImages: number;
}

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private http = inject(HttpClient);

    uploadPerfumeImages(perfumeId: string, files: File[]): Observable<UploadResponse> {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        return this.http.post<UploadResponse>(
            `/api/upload/perfume/${perfumeId}/images`,
            formData
        );
    }

    deletePerfumeImage(perfumeId: string, imageUrl: string): Observable<void> {
        return this.http.delete<void>(
            `/api/upload/perfume/${perfumeId}/image`,
            { body: { imageUrl } }
        );
    }
}
