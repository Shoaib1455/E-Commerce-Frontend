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
    
    // Thumbnail image
    imagePreview: string | ArrayBuffer | null = null;
    ThumbnailImage: File | null = null;
    
    // Multiple images
    imagePreviews: (string | ArrayBuffer)[] = [];
    ProductImages: File[] = [];

    product = {
        Name: '',
        price: null,
        categoryName: '',
        sku: null,
        Quantity: 0,
        description: '',
        ImageUrl: ''
    };

    categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Home Appliances'];

    token = localStorage.getItem('authToken');
    
    // Handle thumbnail image
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.ThumbnailImage = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
                this.product.ImageUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle multiple images
    onMultipleFilesSelected(event: any) {
        const files: FileList = event.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.ProductImages.push(file);
                
                const reader = new FileReader();
                reader.onload = () => {
                    this.imagePreviews.push(reader.result as string | ArrayBuffer);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    removeImage(index: number) {
        this.ProductImages.splice(index, 1);
        this.imagePreviews.splice(index, 1);
    }

    onSubmit() {
        const token = localStorage.getItem('authToken');

        // Create FormData for multipart request
        const formData = new FormData();
        formData.append('Name', this.product.Name);
        formData.append('price', String(this.product.price || 0));
        formData.append('categoryName', this.product.categoryName);
        formData.append('sku', String(this.product.sku || 0));
        formData.append('description', this.product.description);
        formData.append('ImageUrl', this.product.ImageUrl);
        formData.append('Quantity', String(this.product.Quantity || 0));

        // Append thumbnail image if exists
        if (this.ThumbnailImage) {
            console.log("Thumbnail image:", this.ThumbnailImage);
            formData.append('ThumbnailImage', this.ThumbnailImage, this.ThumbnailImage.name);
        }

        // Append all selected images
        for (let i = 0; i < this.ProductImages.length; i++) {
            formData.append('ProductImages', this.ProductImages[i], this.ProductImages[i].name);
        }

        this.productservice.addProduct(formData).subscribe({
            next: () => { 
                console.log("data sent successfully");
                this.onCancel();
            },
            error: (err) => {
                console.log("error occurred", err)
            }
        })
    }

    onCancel() {
        this.product = { Name: '', price: null, categoryName: '', sku: null, description: '', ImageUrl: '' ,Quantity: 0};
        this.imagePreview = null;
        this.ThumbnailImage = null;
        this.imagePreviews = [];
        this.ProductImages = [];
    }

}