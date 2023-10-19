import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashProductsComponent } from './dash-products/dash-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule ,ReactiveFormsModule   } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DndDirective } from './add-products/dnd.directive';
import { ProgressComponent } from './add-products/progress/progress.component';

@NgModule({
  declarations: [
    
  
    DashProductsComponent,
            AddProductsComponent,
            EditProductComponent,
            DndDirective,
            ProgressComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class DashBoardModule { }
