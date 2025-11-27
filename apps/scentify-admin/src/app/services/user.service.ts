import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser } from '@scentify/shared-types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;
    private http: HttpClient = inject(HttpClient);

    getUsers(): Observable<AdminUser[]> {
        return this.http.get<AdminUser[]>(this.apiUrl);
    }

    getUser(id: string): Observable<AdminUser> {
        return this.http.get<AdminUser>(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, data: Partial<AdminUser>): Observable<AdminUser> {
        return this.http.patch<AdminUser>(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: string): Observable<AdminUser> {
        return this.http.delete<AdminUser>(`${this.apiUrl}/${id}`);
    }
}
