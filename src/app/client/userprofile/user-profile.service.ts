import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private apiurl = 'https://localhost:7039/api/UserManagement/GetsUserProfile';
    //token = localStorage.getItem('token') || '';
    constructor(private http: HttpClient) { }
    getUserProfile(token: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        })

        //token = localStorage.getItem('token') || '';
        return this.http.get<any>(this.apiurl, { headers });
    }
}
