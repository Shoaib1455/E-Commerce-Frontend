import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl = 'https://localhost:7039/api/ProductsManagement/GetAllProducts';
    constructor(private http: HttpClient) { }

    getallProducts() {
        return this.http.get<any[]>(this.apiUrl);
    }
}