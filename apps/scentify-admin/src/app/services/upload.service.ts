import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    private apiUrl = `${environment.apiUrl}/upload`;

    uploadPerfumeImages(perfumeId: string, files: File[]): Observable<UploadResponse> {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        return this.http.post<UploadResponse>(
            `${this.apiUrl}/perfume/${perfumeId}/images`,
            formData
        );
    }

    deletePerfumeImage(perfumeId: string, imageUrl: string): Observable<void> {
        return this.http.delete<void>(
            `${this.apiUrl}/perfume/${perfumeId}/image`,
            { body: { imageUrl } }
        );
    }
}
