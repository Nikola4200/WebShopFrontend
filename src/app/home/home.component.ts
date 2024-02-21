import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  pagedProducts: Product[] = [];
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24]; 


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.updatePagedProducts(0);
      });
  }
  updatePagedProducts(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.updatePagedProducts(event.pageIndex);
  }
}