
import { AuthComponent } from "./auth.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: AuthComponent }
];

@NgModule({

    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)]
})

export class AuthModule { }