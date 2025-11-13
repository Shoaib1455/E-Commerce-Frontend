import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SellerRegisterService {

    private apiUrl = 'SellerUsers/CreateUser';
    constructor(private http: HttpClient) { }
    Register(userdata: any): Observable<any> {
        return this.http.post<any>(environment.backendUrl + this.apiUrl, userdata, { observe: "response" })
    }
}