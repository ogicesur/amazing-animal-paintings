import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortOrder: string = "";

  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open('Product added to cart', "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase().trim();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    );

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string): void {
    this.sortOrder = sortValue;
    if (sortValue === 'priceLowHigh') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'priceHighLow') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
