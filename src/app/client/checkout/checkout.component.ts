import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

    stripe!: Stripe | null;
    card!: StripeCardElement;

    amount = 5000; // your order total (in cents)
    orderId = 123;

    constructor(private paymentService: PaymentService) { }

    async ngOnInit() {
        // 1️⃣ Load Stripe with your public key
        this.stripe = await loadStripe('pk_test_51SXHeBINeRcPQQXNTNuPtFXM5MDrWp85w0AP9WJchyz2CjQ05TkFh8ngbY3JGjTAyzL5e9shJTe281iYtcPh8EAc00CWtdEmtr');

        // 2️⃣ Create a card element  
        const elements = this.stripe!.elements();
        this.card = elements.create('card');
        this.card.mount('#card-element');
    }

    async pay() {
        // 3️⃣ Call backend to create PaymentIntent & get clientSecret
        const res = await this.paymentService
            .createPaymentIntent(this.amount, this.orderId)
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
}
