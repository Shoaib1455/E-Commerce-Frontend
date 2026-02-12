import { Injectable, } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    //private apiUrl = 'https://localhost:7039/api/ProductsManagement/GetAllProducts';
    private productByIdApiUrl = 'products';
    constructor(private http: HttpClient) { }

    // getallProducts() {
    //     return this.http.get<any[]>(this.apiUrl);
    // }
    getproductbyid(id: number): Observable<any> {
        return this.http.get<any>(`${environment.backendUrl + this.productByIdApiUrl}/${id}`, { observe: 'response' });
    }
    addToCart(productId: number): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const body = { product_id: productId, quantity: 1 };

        return this.http.post(`${environment.backendUrl + this.productByIdApiUrl}`, body, { headers });
    }
}