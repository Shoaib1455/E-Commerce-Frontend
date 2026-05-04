import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellerDashboardComponent } from './seller-dashboard.component';

const routes: Routes = [
    { path: '', component: SellerDashboardComponent }
];

@NgModule({
    declarations: [SellerDashboardComponent],
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerDashboardModule { }
