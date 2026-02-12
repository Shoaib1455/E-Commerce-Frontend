import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    //private apiUrl = "ProductManagement/AddProduct"
     private apiUrl = "products"

    constructor(private http: HttpClient) { }

    addProduct(formData: FormData): Observable<any> {
        const token = localStorage.getItem('authToken');

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        
        // Don't set Content-Type header for FormData - browser will set it automatically with boundary
        return this.http.post<any>(environment.backendUrl + this.apiUrl, formData, { headers })
    }
}