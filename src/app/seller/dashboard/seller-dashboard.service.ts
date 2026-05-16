import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"  ;
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})      
export class SellerDashboardService {
    private apiUrl = "SellerDashboard/DashboardData";    
    constructor(private http: HttpClient) 
    { 

    }
    DashboardData() {
         const token = localStorage.getItem('authToken');
        
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                });
        return this.http.get<any>(environment.backendUrl+this.apiUrl, { headers });     
    }
}