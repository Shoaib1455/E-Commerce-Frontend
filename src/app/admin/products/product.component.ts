import { Component } from "@angular/core";
@Component({
    selector: 'add-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class AddProductComponent {

    product = {
        productName: '',
        price: null,
        category: '',
        sku: null,
        description: '',
        image: null
    };

    categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Home Appliances'];

    imagePreview: string | ArrayBuffer | null = null;

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.product.image = file;

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit() {
        this
        // send this data to backend API (FormData)
    }

    onCancel() {
        this.product = { productName: '', price: null, category: '', sku: null, description: '', image: null };
        this.imagePreview = null;
    }

}