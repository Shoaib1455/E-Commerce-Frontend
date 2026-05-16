import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SellerDashboardService } from './seller-dashboard.service';

@Component({
    selector: 'app-seller-dashboard',
    templateUrl: './seller-dashboard.component.html',
    styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
    constructor(private router: Router, private sellerDashboardService: SellerDashboardService) { }

    ngOnInit(): void {
        this.getDashboardData();
    }

    metrics = [
        { label: 'Revenue', value: 'PKR 248K', note: '+12.4% this month' },
        { label: 'Orders', value: '1,284', note: '86 pending fulfilment' },
        { label: 'Products', value: '342', note: '24 low stock' },
        { label: 'Store rating', value: '4.8', note: 'Based on recent reviews' }
    ];

    tasks = [
        'Ship 18 orders before 6 PM',
        'Add hero banner for weekend sale',
        'Restock 6 best-selling products',
        'Reply to 4 customer questions'
    ];
    

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        this.router.navigate(['/seller-login']);
    }
    getDashboardData() {
        this.sellerDashboardService.DashboardData().subscribe({
            next:(res)=>{
                console.log("dashboard data: ", res);
            },
            error:(err)=>{console.log("dashboard data error: ", err)}
            })
        }
}
