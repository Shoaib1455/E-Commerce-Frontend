import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    private baseUrl = 'https://localhost:7039/api/webhooks/createpaymentintent';

    constructor(private http: HttpClient) { }

    createPaymentIntent(orderId: number) {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('authToken');
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return this.http.post<{ clientSecret: string }>(
            `${this.baseUrl}`,
            {  orderId },
            { headers }
        );
    }
}