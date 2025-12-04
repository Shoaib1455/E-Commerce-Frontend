import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseUrl = environment.backendUrl;

    constructor(private http: HttpClient) { }

    checkoutUser(checkoutData: any): Observable<any> {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('authToken');
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return this.http.post(`${this.baseUrl}OrderManagement/checkoutuser`, checkoutData, { headers });
    }
}
