import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    private base = 'https://localhost:7039/api/categories';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.base);
    }

    getById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.base}/${id}`);
    }

    create(category: Category): Observable<Category> {
        return this.http.post<Category>(this.base, category);
    }

    update(id: number, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.base}/${id}`, category);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}
