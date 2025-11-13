import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SellerAuthService {
    private apiUrl = 'UserManagement/Login'
    constructor(private http: HttpClient) { }

    login(sellerData: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(environment.backendUrl + this.apiUrl, sellerData, { observe: 'response' })
    }
}