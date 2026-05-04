import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellerProductListComponent } from './seller-product-list.component';

const routes: Routes = [
    { path: '', component: SellerProductListComponent }
];

@NgModule({
    declarations: [SellerProductListComponent],
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerProductListModule { }
