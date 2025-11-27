import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Perfume } from "@scentify/shared-types";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PerfumesService {
    private apiUrl = `${environment.apiUrl}/perfumes`;
    private http: HttpClient = inject(HttpClient);

    getPerfumes(): Observable<Perfume[]> {
        return this.http.get<Perfume[]>(this.apiUrl);
    }

    getPerfume(id: string): Observable<Perfume> {
        return this.http.get<Perfume>(`${this.apiUrl}/${id}`);
    }

    createPerfume(data: Partial<Perfume>): Observable<Perfume> {
        return this.http.post<Perfume>(this.apiUrl, data);
    }

    updatePerfume(id: string, data: Partial<Perfume>): Observable<Perfume> {
        return this.http.patch<Perfume>(`${this.apiUrl}/${id}`, data);
    }

    deletePerfume(id: string): Observable<Perfume> {
        return this.http.delete<Perfume>(`${this.apiUrl}/${id}`);
    }
}