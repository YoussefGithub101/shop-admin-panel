import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit{
  title='pagination'
 
  page:number=1;
  count:number=0;
  tableSize:number=6;
  tableSizes:any=[5,10,15,20];


  SearchID:any;
  product:any=[]
  errorMessage: any;
  cartData1:any=[]
  constructor(private ProductsService:ProductsService,private activatedRoute: ActivatedRoute, private router:Router , private http: HttpClient,private CartService:CartService){
    this.cartData1= ProductsService.cartData

  }
  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    this.SearchID=params.get("searchProduct")
    console.log(this.SearchID) 
    this.getproduct()
   })

  
}
getproduct(){
  this.ProductsService.getproductSearch(this.SearchID).subscribe({
    next:(data:any)=>{
      this.product=data
      
       
    },error:error=>this.errorMessage=error
  })
}


goToproductID(id:any){
  this.router.navigate(["/store/Shop",id])
}


onTableDataChange(event:any){
  this.page=event;
  this.getproduct();
}
 
// addToCart(id:any){
//   const cart = this.Searchdata.filter((producta:any) =>producta.id === id);
//    const x:any = localStorage.getItem("myCart");
//      const foundObject=JSON.parse(x)?.find((e:any) => e.id === id)
//      if(foundObject){
//        console.log("this cart is already added")
//        alert("this cart is already added");
//      }else{
//        this.cartData1.push(cart[0])
//        localStorage.setItem('myCart', JSON.stringify(this.cartData1))
//        alert("cart added");
//      }
//  }
addToCart(id:any){
  this.CartService.addToCart(id,this.product,"alertAdd","alertNotadded")
}

}