import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'client', loadChildren: () => import('./client/products/products.module').then(m => m.ProductsModule) },
  { path: 'Auth', loadChildren: () => import('./client/auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', loadChildren: () => import('./client/userprofile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'add-product', loadChildren: () => import('./admin/products/product.module').then(m => m.AddProductModule) },

  { path: '', redirectTo: 'Auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
