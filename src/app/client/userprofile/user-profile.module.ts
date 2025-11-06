import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from "./user-profile.component";

import { share } from "rxjs";

const routes: Routes = [
    { path: '', component: UserProfileComponent }
]

@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UserProfileModule { }

