import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    // Cart items loaded from localStorage
    cartItems: any[] = [];

    shippingFee = 250;
    discount = 500;
    subtotal = 0; // Will be calculated from cartItems
    grantTotal = 0;
    sameAsShipping = true;
    totalAmount = 0;

    selectedPaymentMethod = 'card';
    loading = false;
    error = '';

    shippingAddress = {
        fullName: '',
        phone: 0,
        street: '',
        city: '',
        postalCode: 0,
        country: '',
        state: ''
    };

    billingAddress = {
        fullName: '',
        phone: 0,
        street: '',
        city: '',
        postalCode: 0,
        country: '',
        state: ''
    };


    // grandTotal(): number {
    //     return this.subtotal + this.shippingFee - this.discount;
    // }

    constructor(private orderService: OrderService, private router: Router) { }

    ngOnInit(): void {
        this.loadCartFromStorage();
        this.calculateSubtotal();
    }

    private loadCartFromStorage(): void {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            // console.log('Loaded cart from localStorage:', cart.product);
            this.cartItems = Array.isArray(cart) ? cart : [];
            console.log('Cart items:', this.cartItems);
        } catch (err) {
            console.error('Failed to load cart from localStorage:', err);
            this.cartItems = [];
        }
    }

    private calculateSubtotal(): void {
        this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    }

    private saveCartToStorage(): void {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        } catch (err) {
            console.error('Failed to save cart to localStorage:', err);
        }
    }

    removeItem(productId: number): void {
        // Remove item and sync to storage
        this.cartItems = this.cartItems.filter(item => item.id != productId);
        this.calculateSubtotal();
        this.saveCartToStorage();
        console.log(`Removed product: ${productId}`);
    }

    updateQuantity(productId: number, change: number): void {
        // Update quantity and sync to storage
        
        const item = this.cartItems.find(p => p.productid == productId);
        console.log(item);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            console.log(`Updated quantity for product ${productId}: ${item.quantity}`);
            // Recalculate total price if unit price exists
            if (item.product.price) {
                item.totalPrice = item.quantity * item.product.price;
            }
            this.calculateSubtotal();
            this.saveCartToStorage();
        }
        console.log(`Updated product ${productId} by ${change}`);
    }

    onSameAsShippingChange(): void {
        if (this.sameAsShipping) {
            // Copy shipping address to billing address
            this.billingAddress = { ...this.shippingAddress };
        }
    }

    proceedToCheckout(): void {
        // Validate form data
        if (!this.shippingAddress.fullName || !this.shippingAddress.phone || !this.shippingAddress.street) {
            this.error = 'Please fill in all required shipping address fields';
            return;
        }

        if (!this.sameAsShipping && (!this.billingAddress.fullName || !this.billingAddress.phone || !this.billingAddress.street)) {
            this.error = 'Please fill in all required billing address fields';
            return;
        }

        if (this.cartItems.length === 0) {
            this.error = 'Your cart is empty';
            return;
        }

        this.loading = true;
        this.error = '';

        // Build checkout payload to match backend expectations
        const addressPayload = this.sameAsShipping ? this.shippingAddress : this.billingAddress;

        // Build orderItems array: { productId, quantity, unitPrice }
        const orderItems = this.cartItems.map(item => {
            // Try multiple possible field names for productId (note: backend uses lowercase 'productid')
            const productId = item.productid || item.productId || item.id || (item.product && item.product.id) || null;
            const quantity = item.quantity || 1;
            let unitPrice = item.product.price;
            if (unitPrice == null) {
                if (item.totalPrice != null && quantity) {
                    unitPrice = +(item.totalPrice / quantity);
                } else if (item.price != null) {
                    unitPrice = item.price;
                } else if (item.product && item.product.price != null) {
                    unitPrice = item.product.price;
                } else {
                    unitPrice = 0;
                }
            }

            return {
                productId,
                quantity,
                unitPrice
            };
        });
        // if(orderItems.some(oi => oi.productId >1)) {

        // }
        console.log('Order Items:', orderItems);
        // Recompute subtotal and total from derived orderItems to avoid stale values
        const computedSubtotal = orderItems.reduce((s, it) => s + (Number(it.unitPrice || 0) * Number(it.quantity || 0)), 0);
        const computedTotal = computedSubtotal + Number(this.shippingFee || 0) - Number(this.discount || 0);
        this.grantTotal = computedTotal;
        // Update component state so UI stays in sync
        this.subtotal = computedSubtotal;

        const checkoutPayload = {

            address: {
                shipping: {
                    fullName: this.shippingAddress.fullName,
                    phone: Number(this.shippingAddress.phone),
                    street: this.shippingAddress.street,
                    city: this.shippingAddress.city,
                    postalCode: Number(this.shippingAddress.postalCode),
                    country: this.shippingAddress.country,
                    state: this.shippingAddress.state
                },
                billing: {
                    fullName: addressPayload.fullName,
                    phone: Number(addressPayload.phone),
                    street: addressPayload.street,
                    city: addressPayload.city,
                    postalCode: Number(addressPayload.postalCode),
                    country: addressPayload.country,
                    state: addressPayload.state
                }
            },
            orderequest: {
                subtotal: computedSubtotal,
                shippingFee: this.shippingFee,
                discount: this.discount,
                totalAmount: computedTotal,
                paymentMethod: this.selectedPaymentMethod
            },
            Order: {
                subtotal: computedSubtotal,
                shippingFee: this.shippingFee,
                discount: this.discount,
                totalAmount: computedTotal,
                paymentMethod: this.selectedPaymentMethod
            },
            orderItems: orderItems
        };


        console.log('Checkout payload:', checkoutPayload);

        this.orderService.checkoutUser(checkoutPayload).subscribe({
            next: (response) => {
                this.loading = false;
                console.log('Order created successfully:', response);
                // Clear cart after successful order
                localStorage.removeItem('cart');
                this.cartItems = [];
                // Navigate to checkout page with order details or success page
                this.router.navigate(['/checkout'], { state: { orderId: response.id, orderData: response } });
            },
            error: (err) => {
                this.loading = false;
                this.error = err?.error?.message || 'Failed to create order. Please try again.';
                console.error('Checkout error:', err);
            }
        });
    }
}