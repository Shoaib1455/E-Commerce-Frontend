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
        // 3️⃣ Call backend to create PaymentIntent & get clientSecret
      
        const res = await this.paymentService
            .createPaymentIntent( this.orderId)
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
    getorderId(event: any) {
        this.orderId = event;
    }
}
