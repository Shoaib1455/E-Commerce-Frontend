import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment"



@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private apiUrl = 'ProductManagement/GetAllProducts';
    constructor(private http: HttpClient) { }

    getproducts() {
        return this.http.get<any>(environment.backendUrl + this.apiUrl, { observe: 'response' })
    }
}