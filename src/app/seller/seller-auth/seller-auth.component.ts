

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SellerAuthService } from './seller-auth.service'


@Component({
    selector: 'app-seller-auth',
    templateUrl: './seller-auth.component.html',
    styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {

    loginData = {
        email: '',
        password: '',
        rememberMe: false
    };

    constructor(private sellerauthservice: SellerAuthService) { }


    login() {

        this.sellerauthservice.login(this.loginData).subscribe({
            next: (res) => {
                console.log("information send successfully");
                var token = res.body.token
                localStorage.setItem('authToken', token);


            },
            error: (err) => console.log("credentials not send error: ", err)
        })
    }
}