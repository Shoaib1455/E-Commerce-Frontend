import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

    stripe!: Stripe | null;
    card!: StripeCardElement;

    amount !: number; // your order total (in cents)
    orderId!: number;

    constructor(private paymentService: PaymentService ,private router:Router) { }

    async ngOnInit() {
        const state = history.state;
       // const state = navigation?.extras.state as any;
        console.log('Received state:', state);
        // 1️⃣ Load Stripe with your public key
        this.stripe = await loadStripe('pk_test_51SXHeBINeRcPQQXNTNuPtFXM5MDrWp85w0AP9WJchyz2CjQ05TkFh8ngbY3JGjTAyzL5e9shJTe281iYtcPh8EAc00CWtdEmtr');

        // 2️⃣ Create a card element  
        const elements = this.stripe!.elements();
        this.card = elements.create('card');
        this.card.mount('#card-element');
        this.orderId = state.orderId;
        this.amount = state.orderData.totalAmount;
    }

    async pay() {
        const idempotencyKey = await this.generateIdempotencyKey(this.orderId);
        // 3️⃣ Call backend to create PaymentIntent & get clientSecret
      
        const res = await this.paymentService
            .createPaymentIntent( this.orderId,idempotencyKey)
            .toPromise();

        const clientSecret = res!.clientSecret;

        // 4️⃣ Confirm card payment from Angular
        const result = await this.stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                card: this.card
            }
        });

        if (result.error) {
            alert('❌ Payment Failed: ' + result.error.message);
        } else {
            if (result.paymentIntent!.status === 'succeeded') {
                alert('✅ Payment Successful!');
                // Optionally call backend to update order status
            }
        }
    }
   // fallback UUID v4 generator
    // private uuidv4(): string {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         const r = Math.random() * 16 | 0;
    //         const v = c === 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    // }
    private async generateIdempotencyKey(orderId: number): Promise<string> {
        const data = new TextEncoder().encode(`order-${orderId}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // return as UUID-like format: 8-4-4-4-12
        return `${hashHex.substring(0, 8)}-${hashHex.substring(8, 12)}-${hashHex.substring(12, 16)}-${hashHex.substring(16, 20)}-${hashHex.substring(20, 32)}`;
    }
    getorderId(event: any) {
        this.orderId = event;
    }
}
