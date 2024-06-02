import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
 
 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './lazy-loading/shop/shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { SingleProductComponent } from './lazy-loading/single-product/single-product.component';
import { CategoriesComponent } from './lazy-loading/categories/categories.component';
 
import { FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  
 
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    PageNotFoundComponent,
    SingleProductComponent,
    CategoriesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
