import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
    selector: 'products-root',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    products: any[] = [];

    constructor(private productservice: ProductsService) { }

    ngOnInit(): void {

    }
    loadproducts(): void {
        this.productservice.getallProducts().subscribe({
            next: (data) => this.products = data,
            error: (error) => console.error('Error fetching products:', error)

        });

    }
}