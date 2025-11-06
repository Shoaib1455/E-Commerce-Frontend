import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    { path: '', component: ProductsComponent }
];

@NgModule(
    {
        declarations: [
            ProductsComponent
        ],
        imports: [
            SharedModule,
            RouterModule.forChild(routes)]
    })
export class ProductsModule { }