import { Component, OnInit } from '@angular/core'
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LoginRegisterDialogComponent } from 'src/app/shared/login-register-dialog/login-register-dialog.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
    products: any[] = [];
    constructor(private homeservice: HomeService, private router: Router, private dialogService: NbDialogService) { }
    ngOnInit(): void {
        this.loadproducts();
    }
    loadproducts(): void {
        this.homeservice.getproducts().subscribe({
            next: (res) => {
                this.products = res.body.$values;

                // log to check
                console.log(this.products);
            },
            error: (error) => console.error('Error fetching products:', error)

        });

    }
    onAddToCart(product_id: number) {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (!token) {
            // open login/register dialog
            const ref = this.dialogService.open(LoginRegisterDialogComponent, { context: {} });
            ref.onClose.subscribe((loggedIn: boolean) => {
                if (loggedIn) {
                    // after login, navigate to product page
                    this.router.navigate(['/product', product_id]);
                }
            });
        } else {
            // if already logged in, navigate directly to product page
            this.router.navigate(['/product', product_id]);
        }
    }

}