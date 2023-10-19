import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartStorge:any=localStorage.getItem("myCart");
  totalPrice:number=0 
  showDiv = true;
  cartData1:any=[]
 
  constructor(private title: Title,private elementRef: ElementRef, private renderer: Renderer2, private ProductsService:ProductsService, private _Router:Router ,public CartService:CartService){
  this.totalPrice=this.CartService.totalPrice
  this.CartService.getTotalPrice()
  
  }
  test(){
    this.cartStorge=localStorage.getItem("myCart")
    this.cartStorge=JSON.parse(this.cartStorge)
  }
  
  
  ngOnInit(): void {
    this.title.setTitle('Cart')
    this.test()
    
  }
 
  incrementQuantity(id:number){
    this.CartService.incrementQuantity(id)
    this.test()
  }
 


  decreaseQuantity(id:number){
    this.CartService.decreaseQuantity(id)
    this.test()
  }


  removeCart(id:any){
    this.CartService.removeCart(id)
    this.test()
  }
 
  isLogIn() {
    if (localStorage.getItem("data") != null) {
      this._Router.navigate(["/checkOut"])
    }
    else {
      Swal.fire({
        title: "login...",
        icon: "error",
        customClass: {
          container: 'my-custom-shape-container'
        }
      });
      this._Router.navigate(["/login"])
    }
  }


 
  }
 




