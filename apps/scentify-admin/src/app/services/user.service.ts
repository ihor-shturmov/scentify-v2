import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = '/api/users';
    private http: HttpClient = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, data: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/${id}`);
    }
}
