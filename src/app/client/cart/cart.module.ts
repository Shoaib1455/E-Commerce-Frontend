import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from "src/app/shared/shared.module";


const routes: Routes = [
    { path: '', component: CartComponent }
];
@NgModule({
    declarations: [CartComponent],
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class CartModule { }