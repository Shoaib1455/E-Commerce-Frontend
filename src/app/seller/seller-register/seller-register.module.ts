import { NgModule } from "@angular/core";
import { SellerRegisterComponent } from "./seller-register.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: '', component: SellerRegisterComponent },

]
@NgModule({
    declarations: [
        SellerRegisterComponent]
    ,
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerRegisterModule { }