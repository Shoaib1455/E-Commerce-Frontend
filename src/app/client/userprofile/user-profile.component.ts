import { Component, OnInit } from "@angular/core";
import { UserProfileService } from "./user-profile.service";
import { NbSidebarService } from "@nebular/theme";
import { Product } from "./user-profile.model";

@Component({
    selector: 'user-profile-root',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    userProfile = {} as {
        name: string;
        email: string;
        role: string;
        avatarUrl?: string;
    }

    token: string = localStorage.getItem('token') || '';
    sidebarCollapsed = false;
    cartOpen = false;


    products: Product[] = [
        { id: 1, title: 'Running Shoes', price: 4500, img: 'assets/products/shoes.jpg', rating: 4.5, tag: 'Sports' },
        { id: 2, title: 'Wireless Headphones', price: 12000, img: 'assets/products/headphones.jpg', rating: 4.7, tag: 'Audio' },
        { id: 3, title: 'Smart Watch', price: 8500, img: 'assets/products/watch.jpg', rating: 4.2, tag: 'Wearable' },
        // ...add or fetch from API
    ];


    cart: { product: Product; qty: number }[] = [];

    toggleSidebar() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        this.sidebarService.toggle(true, 'left'); // 'left' is the sidebar tag
    }


    openCart() {
        this.cartOpen = true;
        this.sidebarService.expand('right');
    }


    closeCart() {
        this.cartOpen = false;
        this.sidebarService.collapse('right');
    }


    addToCart(p: Product) {
        const existing = this.cart.find(c => c.product.id === p.id);
        if (existing) existing.qty += 1;
        else this.cart.push({ product: p, qty: 1 });
    }


    removeFromCart(p: Product) {
        this.cart = this.cart.filter(c => c.product.id !== p.id);
    }


    total() {
        return this.cart.reduce((s, c) => s + c.product.price * c.qty, 0);
    }
    constructor(private userprofileservice: UserProfileService, private sidebarService: NbSidebarService) { }
    ngOnInit(): void {
        this.userprofileservice.getUserProfile(this.token).subscribe({
            next: (data) => this.userProfile = data,
            error: (error) => console.error('Error fetching user profile:', error)
        });
    }

}
