import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    private apivUrl = 'https://localhost:7039/api/usermanagement/Login';
    constructor(private http: HttpClient) {
    }
    postLogin(userdata: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.apivUrl, userdata, { observe: 'response' });
    }

}