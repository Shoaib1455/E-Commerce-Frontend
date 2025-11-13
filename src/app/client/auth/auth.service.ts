import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    private apivUrl = 'usermanagement/Login';
    constructor(private http: HttpClient) {
    }
    postLogin(userdata: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(environment.backendUrl + this.apivUrl, userdata, { observe: 'response' });
    }

}