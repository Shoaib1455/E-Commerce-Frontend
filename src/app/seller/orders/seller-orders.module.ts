import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellerOrdersComponent } from './seller-orders.component';

const routes: Routes = [
    { path: '', component: SellerOrdersComponent }
];

@NgModule({
    declarations: [SellerOrdersComponent],
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerOrdersModule { }
