import { Component } from "@angular/core";
import { ProductsService } from "./products.service"
import { HttpHeaders } from "@angular/common/http";
@Component({
    selector: 'add-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class AddProductComponent {
    constructor(private productservice: ProductsService) { }
    imagePreview: string | ArrayBuffer | null = null;

    product = {
        Name: '',
        price: null,
        categoryName: '',
        sku: null,
        description: '',
        imageUrl: ''
    };

    categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Home Appliances'];

    token = localStorage.getItem('authToken');
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.product.imageUrl = reader.result as string;

            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit() {
        const token = localStorage.getItem('authToken');


        this.productservice.addProduct(this.product).subscribe({
            next: () => { console.log("data send successfully") },
            error: (err) => {
                console.log("error occured", err)
            }
        })
        // send this data to backend API (FormData)
    }

    onCancel() {
        this.product = { Name: '', price: null, categoryName: '', sku: null, description: '', imageUrl: '' };
        this.imagePreview = null;
    }

}