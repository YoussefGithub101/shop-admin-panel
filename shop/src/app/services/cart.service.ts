import { Injectable } from '@angular/core';
// import {CartItem} from "../interfaces/cart"
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData:any= [] ;
  totalQuantity:number;
  totalPrice:number;
  
  constructor() { 
    this.check();
    this.getTotalPrice()
   this. updateTotalQuantity()
  }
  
 //check if there is a cart or not , if not cart is an empty array
 check(){
  if(localStorage.getItem("myCart")===null){
    this.cartData=[];
  } else{
    this.cartData=localStorage.getItem("myCart")
    this.cartData=JSON.parse(this.cartData)
  }
}

    //addToCart
  addToCart(id:any , data:any ,AlertAdd:string ,notAdded:string){

    this.check();
    const cart = data.filter((producta:any) =>producta.id === id);
    cart[0].Quantity =1
     const x:any = localStorage.getItem("myCart");
       const foundObject=JSON.parse(x)?.find((e:any) => e.id === id)
       if(foundObject){
        this.alertFunction(notAdded)
       }else{
        this.cartData.push(cart[0])
         localStorage.setItem('myCart', JSON.stringify(this.cartData))
         this.alertFunction(AlertAdd)
         this.updateTotalQuantity()
       }
   }



    //getCart
   getCart(){
    return this.cartData
   }

   //alertFunction pop up function 
   alertFunction(Alert:string) {
    const alert1 = <HTMLInputElement> document.getElementById(Alert);
    alert1.className = "show";
    setTimeout(function(){ alert1.className = alert1.className.replace("show",""); }, 1000);
  }

  //update & get the total price
  getTotalPrice(){
    this.totalPrice=0
    for (const cartdata of this.cartData) {
      this.totalPrice += cartdata.price-(cartdata.price *(cartdata.discountPercentage/100));
    }
  }

  incrementQuantity(id:number){
    let Index = this.cartData.findIndex((item:any)=> item.id == id);
    if(this.cartData[Index].Quantity !==this.cartData[Index].stock){
     const price = this.cartData[Index].price 
     this.cartData[Index].Quantity ++;
     const Quantity = this.cartData[Index].Quantity
     this.cartData[Index].price = (price * Quantity)/(Quantity-1)  
     localStorage.setItem('myCart',JSON.stringify(this.cartData))
           //update Total price
           this.getTotalPrice()
           //update cart count
          this.updateTotalQuantity()
           
   }
  }
  decreaseQuantity(id:number){
    let Index = this.cartData.findIndex((item:any)=> item.id == id);
    if(this.cartData[Index].Quantity !==1){
     const price = this.cartData[Index].price 
     this.cartData[Index].Quantity --;
     const Quantity = this.cartData[Index].Quantity
     this.cartData[Index].price = (price * Quantity)/(Quantity+1)  
     localStorage.setItem('myCart',JSON.stringify(this.cartData))
           //update Total price
           this.getTotalPrice()
           //update cart count
          this.updateTotalQuantity()
   }
  }

  removeCart(id:any){
    this.cartData = this.cartData.filter((producta:any) =>producta.id !== id);
    localStorage.setItem('myCart',JSON.stringify(this.cartData))
           //update Total price
           this.getTotalPrice()
           //update cart count
          this.updateTotalQuantity()
  }


  // Calculate and update the total quantity
   updateTotalQuantity() {
    this.totalQuantity  = this.cartData.reduce((acc:any, item:any) => acc + item.Quantity, 0);
  }
}
