import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private productsApiUrl = 'products';
    private cartApiUrl = 'CartManagement/AddProductToCart';
    private productByIdApiUrl = 'ProductManagement/GetProductById';
    constructor(private http: HttpClient) { }

    getproducts() {
        return this.http.get<any>(environment.backendUrl + this.productsApiUrl, { observe: 'response' })
    }
    getproductbyid(id: number): Observable<any> {
        return this.http.get<any>(`${environment.backendUrl + this.productByIdApiUrl}/${id}`, { observe: 'response' });
    }
    addToCart(productId: number): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const body = { product_id: productId, quantity: 1 };

        return this.http.post(`${environment.backendUrl + this.cartApiUrl}`, body, { headers });
    }
}