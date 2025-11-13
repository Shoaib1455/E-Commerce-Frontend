import { NgModule } from "@angular/core";
import { SellerAuthComponent } from "./seller-auth.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: '', component: SellerAuthComponent },

]
@NgModule({
    declarations: [
        SellerAuthComponent]
    ,
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class SellerModule { }