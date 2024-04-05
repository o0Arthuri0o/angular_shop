import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productService: ProductsService ) {}

  products: Product[] = [];
  rows: number = 5;
  totalRecords: number = 0;

  onProductOutput(product: Product) {
    console.log(product, 'Output')
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
    .getProducts('http://localhost:3000/clothes', {page, perPage})
    .subscribe((products: Products) => {
      this.products = products.items
      this.totalRecords = products.total;
      console.log(products)
    })
  }

  ngOnInit() {
   this.fetchProducts(0, this.rows)
    
  }

  editProduct(product: Product, id: number) {
    this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe(
        {
          next: (data) => {
            console.log(data)
            this.fetchProducts(0, this.rows)
          },
          error: (error) => console.log(error)
        }
      )
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe(
        {
          next: (data) => {
            console.log(data)
            this.fetchProducts(0, this.rows)
          },
          error: (error) => console.log(error)
        }
      );
  }

  addProduct(product: Product, id: number) {
    this.productService.addProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe(
        {
          next: (data) => {
            console.log(data)
            this.fetchProducts(0, this.rows)
          },
          error: (error) => console.log(error)
        }
      );
  }



}
