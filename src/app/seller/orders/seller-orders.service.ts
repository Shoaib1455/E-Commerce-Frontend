import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"  ;
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
}) 
export class SellerOrdersService {
    private apiUrl = "SellerDashboard/GetSellerOrders";    
    constructor(private http: HttpClient) 
    { }
    OrdersData() {
         const token = localStorage.getItem('authToken');
         const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                });
        return this.http.get<any>(`${environment.backendUrl}${this.apiUrl}`, { headers });     
    }
}