import { Component, OnInit } from '@angular/core'
import { HomeService } from './home.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
    products: any[] = [];
    constructor(private homeservice: HomeService) { }
    ngOnInit(): void {
        this.loadproducts();
    }
    loadproducts(): void {
        this.homeservice.getproducts().subscribe({
            next: (res) => {
                this.products = res.body.$values;

                // log to check
                console.log(this.products);
            },
            error: (error) => console.error('Error fetching products:', error)

        });

    }
}