import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');

    if(access_token == null){
      alert("Unable to review orders!");
      this.router.navigate(['']);
      return;
    }
    if (userId !== null && access_token !== null) {
      this.orderService.getOrdersByUserId(userId, access_token).subscribe(
        (response) => {
          this.orders = response as any[];
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
