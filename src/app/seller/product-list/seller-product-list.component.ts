import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerProductsService } from './seller-product-list.service';

@Component({
    selector: 'app-seller-product-list',
    templateUrl: './seller-product-list.component.html',
    styleUrls: ['./seller-product-list.component.scss']
})
export class SellerProductListComponent {
    products = [
        { name: 'Wireless Headphones', sku: 'EL-2048', category: 'Electronics', stock: 42, price: 12500, status: 'Active' },
        { name: 'Cotton Hoodie', sku: 'FA-8812', category: 'Fashion', stock: 18, price: 4500, status: 'Active' },
        { name: 'Ceramic Dinner Set', sku: 'HM-1903', category: 'Home', stock: 6, price: 8900, status: 'Low stock' },
        { name: 'Running Shoes', sku: 'SP-4308', category: 'Sports', stock: 0, price: 9700, status: 'Out of stock' }
    ];

    constructor(private router: Router, private sellerProductsService: SellerProductsService) { }
    ngOnInit(): void {
        this.productsdata();
    }
productsdata(){
    // Call the service method to fetch products data
    this.sellerProductsService.ProductsData().subscribe({
        next:(res)=>{
            console.log("products data:",res);
            this.products = res.map((product: any) => ({
                name: product.name,
                sku: product.sku,
                category: product.categoryName,
                stock: product.quantity,
                price: product.price,
                status: product.status
            }));
            console.log("mapped products data:",this.products);
        },
        error:(err)=>{
            console.log("products data error:",err)
        }
    })
}
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        this.router.navigate(['/seller-login']);
    }
}
