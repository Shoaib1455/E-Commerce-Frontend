import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { NbDialogService } from '@nebular/theme';
import { LoginRegisterDialogComponent } from 'src/app/shared/login-register-dialog/login-register-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'products-root',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: any[] = [];
    product: any = {};
    images: string[] = [];
    productId: number = 0;
    selectedImageIndex = 0;
    quantity = 1;
    reviews: Array<{ author?: string; rating?: number; comment?: string }> = [];
    newReviewText = '';
    relatedProducts: any[] = [];
    deliveryOptions: string[] = [
        'Standard delivery — 3 to 7 business days',
        'Express delivery — 1 to 2 business days',
        'Free pickup — available at select locations'
    ];

    constructor(
        private productservice: ProductsService,
        private route: ActivatedRoute,
        private dialogService: NbDialogService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.productId = id
            console.log(id);
        });
        this.productservice.getproductbyid(this.productId).subscribe({
            next: (data) => {
                this.product = data.body || [];

                console.log(this.product);
                this.setupProductState();
            },
            error: (error) => {
                console.error('Error fetching products:', error);
                // fallback: empty product
                this.product = null;
            }
        });
    }

    private setupProductState() {
        if (!this.product) {
            this.images = [];
            this.relatedProducts = [];
            this.reviews = [];
            return;
        }

        // fill images from various possible fields
        if (Array.isArray(this.product.images) && this.product.images.length) {
            this.images = this.product.images;
        } else if (this.product.imageUrl) {
            this.images = [this.product.imageUrl];
        } else if (this.product.imagesUrls) {
            this.images = this.product.imagesUrls;
        } else {
            this.images = [];
        }

        this.selectedImageIndex = 0;
        this.reviews = this.product.reviews || [];
        this.relatedProducts = this.products.filter((p: any) => p !== this.product).slice(0, 8);
    }

    get currentImage() {
        return this.images[this.selectedImageIndex] || 'assets/placeholder.png';
    }

    selectImage(i: number) {
        if (i >= 0 && i < this.images.length) {
            this.selectedImageIndex = i;
        }
    }

    addToCart() {
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        if (!token) {
            // open login/register dialog
            const ref = this.dialogService.open(LoginRegisterDialogComponent, { context: {} });
            ref.onClose.subscribe((loggedIn: boolean) => {
                if (loggedIn) {
                    this.addToCartInternal();
                    this.router.navigate(['/cart']);
                }
            });
        } else {
            this.addToCartInternal();
            this.router.navigate(['/cart']);
        }
    }

    private addToCartInternal() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ productid: this.productId, product: this.product, quantity: this.quantity });
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Added to cart', this.product, 'qty', this.quantity);
        } catch (err) {
            console.error('Could not add to cart', err);
        }
    }

    submitReview() {
        if (!this.newReviewText || !this.newReviewText.trim()) return;
        const rev = { author: 'You', rating: 5, comment: this.newReviewText.trim() };
        this.reviews.unshift(rev);
        this.newReviewText = '';
    }

    openRelated(rp: any) {
        this.product = rp;
        this.setupProductState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    rpImage(rp: any) {
        if (!rp) return 'assets/placeholder.png';
        if (rp.imageUrl) return rp.imageUrl;
        if (Array.isArray(rp.images) && rp.images.length) return rp.images[0];
        return 'assets/placeholder.png';
    }
    // onAddToCart(product_id: number) {
    //     this.homeservice.addToCart(product_id).subscribe({
    //         next: (res) => {
    //             this.products = res.body.$values;

    //             // log to check
    //             console.log(this.products);
    //         },
    //         error: (error) => console.error('Error fetching products:', error)

    //     });
    // }
}