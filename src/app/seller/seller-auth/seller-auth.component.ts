import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { SellerAuthService } from './seller-auth.service'
import { Router } from '@angular/router';


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

    constructor(private sellerauthservice: SellerAuthService, private router: Router) { }
    login() {

        this.sellerauthservice.login(this.loginData).subscribe({
            next: (res) => {
                console.log("information send successfully");
                var token = res.body.token
                localStorage.setItem('authToken', token);
                this.router.navigate(['/add-product']);


            },
            error: (err) => console.log("credentials not send error: ", err)
        })
    }
}