import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((productData) => {
      this.cartItems = productData;
      this.totalPrice = this.getTotalPrice();
    });
  }
  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }
  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
    });
  }
  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe();
  }
}
