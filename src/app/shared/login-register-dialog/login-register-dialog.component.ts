import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from 'src/app/client/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-register-dialog',
    templateUrl: './login-register-dialog.component.html',
    styleUrls: ['./login-register-dialog.component.scss']
})
export class LoginRegisterDialogComponent {
    mode: 'login' | 'register' = 'login';

    // login model
    loginModel: any = { email: '', Password: '' };

    // register model
    registerModel: any = { email: '', password: '', name: '' };

    loading = false;
    error = '';

    constructor(protected dialogRef: NbDialogRef<LoginRegisterDialogComponent>, private auth: AuthService, private router: Router) { }

    switchMode(mode: 'login' | 'register') {
        this.mode = mode;
        this.error = '';
    }

    submit() {
        this.error = '';
        if (this.mode === 'login') {
            this.doLogin();
        } else {
            this.doRegister();
        }
    }

    private doLogin() {
        this.loading = true;
        this.auth.postLogin(this.loginModel).subscribe({
            next: (res) => {
                const token = res?.body?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    this.dialogRef.close(true);
                    // optionally navigate elsewhere
                } else {
                    this.error = 'Login failed: no token returned';
                }
            },
            error: (err) => {
                this.error = err?.error?.message || 'Login failed';
                console.error(err);
            },
            complete: () => (this.loading = false)
        });
    }

    private doRegister() {
        this.loading = true;
        // call register endpoint (AuthService.register must exist)
        if (typeof this.auth.postRegister !== 'function') {
            this.error = 'Registration is not available on the client.';
            this.loading = false;
            return;
        }

        this.auth.postRegister(this.registerModel).subscribe({
            next: (res) => {
                // assume API returns token on successful registration
                const token = res?.body?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    this.dialogRef.close(true);
                } else {
                    // if API does not return token, try logging in automatically
                    this.auth.postLogin({ email: this.registerModel.email, PasswordN: this.registerModel.password }).subscribe({
                        next: (r) => {
                            const t = r?.body?.token;
                            if (t) {
                                localStorage.setItem('token', t);
                                this.dialogRef.close(true);
                            } else {
                                this.error = 'Registration succeeded but automatic login failed.';
                            }
                        },
                        error: (e) => {
                            this.error = 'Registration succeeded but login failed.';
                            console.error(e);
                        },
                        complete: () => (this.loading = false)
                    });
                }
            },
            error: (err) => {
                this.error = err?.error?.message || 'Registration failed';
                console.error(err);
                this.loading = false;
            }
        });
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
