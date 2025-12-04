import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'client', loadChildren: () => import('./client/products/products.module').then(m => m.ProductsModule) },
  { path: 'Auth', loadChildren: () => import('./client/auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', loadChildren: () => import('./client/userprofile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'add-product', loadChildren: () => import('./seller/products/product.module').then(m => m.AddProductModule) },
  { path: 'public', loadChildren: () => import('./client/public/public.module').then(m => m.PublicModule) },
  { path: 'seller-login', loadChildren: () => import('./seller/seller-auth/seller-auth.module').then(m => m.SellerModule) },
  { path: 'seller-register', loadChildren: () => import('./seller/seller-register/seller-register.module').then(m => m.SellerRegisterModule) },
  { path: 'cart', loadChildren: () => import('./client/cart/cart.module').then(m => m.CartModule) },
  { path: 'product', loadChildren: () => import('./client/products/products.module').then(m => m.ProductModule) },
  { path: 'checkout', loadChildren: () => import('./client/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'admin/categories', loadChildren: () => import('./admin/categories/categories.module').then(m => m.CategoriesModule) },
  { path: '', redirectTo: 'public', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
