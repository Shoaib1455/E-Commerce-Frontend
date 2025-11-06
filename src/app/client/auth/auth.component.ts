import { Component, OnInit } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { AuthService } from './auth.service';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-root',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],

})
export class AuthComponent implements OnInit {
    userdata = {} as {
        email: string;
        PasswordN: string;
        role: string;
    };
    constructor(private userdataservice: AuthService, private router: Router) {

    }
    ngOnInit(): void {

    }
    login(): void {
        let token;
        this.userdataservice.postLogin(this.userdata).subscribe(res => {
            token = res.body.token;
            localStorage.setItem('token', token);
            this.router.navigate(['/profile']);
        }

        );
    }
}
