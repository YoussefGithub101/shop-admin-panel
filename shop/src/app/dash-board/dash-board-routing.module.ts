import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashProductsComponent } from './dash-products/dash-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: DashProductsComponent },
  { path: 'AddProducts', component: AddProductsComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
