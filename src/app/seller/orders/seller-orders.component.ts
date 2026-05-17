import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerOrdersService } from './seller-orders.service';

@Component({
    selector: 'app-seller-orders',
    templateUrl: './seller-orders.component.html',
    styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent {
    orders = [
        { id: 'ORD-1042', customer: 'Ayesha Khan', items: 3, total: 18400, status: 'Processing', date: 'Today' },
        { id: 'ORD-1041', customer: 'Hamza Ali', items: 1, total: 12500, status: 'Ready to ship', date: 'Today' },
        { id: 'ORD-1039', customer: 'Sara Ahmed', items: 2, total: 7600, status: 'Shipped', date: 'Yesterday' },
        { id: 'ORD-1034', customer: 'Bilal Raza', items: 4, total: 22900, status: 'Return requested', date: 'Apr 30' }
    ];

    constructor(private router: Router ,private sellerOrdersService: SellerOrdersService) { }
ngOnInit(): void {
        this.ordersdata();
    }
    ordersdata(){
        this.sellerOrdersService.OrdersData().subscribe({
            next:(res)=>{
                console.log("orders data:",res);
                this.orders = res.map((order: any) => ({
                    id: order.orderid,
                    customer: order.customername,
                    items: order.quantity,
                    total: order.totalprice,
                    status: order.status,
                    date: order.createdat
                }));
                console.log("mapped orders data:",this.orders);
            },
            error:(err)=>{
                console.log("orders data error:",err)
            }
        })
    }
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        this.router.navigate(['/seller-login']);
    }
}
