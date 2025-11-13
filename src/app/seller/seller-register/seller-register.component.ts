import { Component } from "@angular/core";
import { SellerRegisterService } from './seller-register.service'
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-seller-register',
    templateUrl: './seller-register.component.html',
    styleUrls: ['./seller-register.component.scss']
})

export class SellerRegisterComponent {
    registrationDetails: any = {
        email: '',
        password: '',
        Name: ''
    }
    constructor(private SellerRegister: SellerRegisterService, private router: Router) { }
    Register(): void {
        this.SellerRegister.Register(this.registrationDetails).subscribe({
            next: (response) => {
                console.log("Information sent successfully", response);
                alert('Registration successful!');
                this.router.navigate(['/seller-login']); // Navigate after success
            },
            error: (err) => {
                console.error("Error sending credentials: ", err);
                alert('Registration failed. Please try again.');
            }
        });
    }
}