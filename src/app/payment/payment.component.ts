import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;

  constructor(private paymentService: PaymentService, private router: Router) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51OC4yrAWv3GmAlJd189bnoV9QtObw3zQTEtNKrERDrMAfPpPSgLcweEqA3RTh8xaieksmVebczeIQa3fqegDDiyA00lWDvRHwX');

    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async onSubmit() {
    const jwt = localStorage.getItem('access_token');
    if(jwt == null){
      alert("Unable to create order!");
      this.router.navigate(['']);
      return;
    }
    if (this.stripe && this.card) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });

      if (error) {
        console.error(error);
        alert("Incorrect credit card data!");
      } else if (paymentMethod) {
        const userId = localStorage.getItem('user_id');
        const access_token = localStorage.getItem('access_token');

        if (userId !== null && access_token !== null) {
          this.paymentService.checkout(userId, access_token, paymentMethod.id).subscribe(
            (response) => {
              alert("Payment successful! Check your e-mail for oder details!");
              this.router.navigate(['/order']);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
    }
  }
}
