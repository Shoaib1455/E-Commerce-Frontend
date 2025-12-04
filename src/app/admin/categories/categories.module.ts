import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategorySidebarComponent } from './category-sidebar/category-sidebar.component';

const routes: Routes = [
    { path: '', component: CategoriesComponent }
];

@NgModule({
    declarations: [CategoriesComponent, CategorySidebarComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoriesModule { }
