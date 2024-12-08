import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CartViewComponent } from './cart-view/cart-view.component';


@NgModule({
  declarations: [CartViewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ]
})
export class CartModule { }
