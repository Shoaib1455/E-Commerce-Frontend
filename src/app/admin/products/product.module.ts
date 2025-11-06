import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AddProductComponent } from "./product.component";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
    { path: '', component: AddProductComponent }
]
@NgModule({
    declarations: [
        AddProductComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AddProductModule { }