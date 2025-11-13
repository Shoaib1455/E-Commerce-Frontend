import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./layout/main-layout.component";
import { SharedModule } from "src/app/shared/shared.module";
//import { AppRoutingModule } from "src/app/app-routing.module";
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";


const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [{
            path: '', // The default route for the shell
            component: HomeComponent, // 🔑 This is the PAGE content
            pathMatch: 'full' // Ensures it only matches the exact path '/public'
        }]
    }

];
@NgModule({
    declarations: [MainLayoutComponent, HomeComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes),]

})
export class PublicModule { }