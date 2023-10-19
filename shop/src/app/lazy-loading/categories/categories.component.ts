import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Iproducts } from "src/app/interfaces/products"
import { CartService } from 'src/app/services/cart.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [5, 10, 15, 20];

  product: any = [];
  errorMessage: any;

  categoriesName: any = [];
  categorieid: any;
  cartData1: any = [];
  baseUrl: string = 'http://localhost:8080';
  isExternalUrl(url: any): boolean {
    return url.startsWith('http');
  }
  constructor(private title: Title, private ProductsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private CartService: CartService) {
    this.cartData1 = ProductsService.cartData

  }


  ngOnInit(): void {

    this.title.setTitle('Proudct Ditails')
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.categorieid = params.get("categorie")
      console.log(this.categorieid)

      this.ProductsService.getAllproducts().subscribe({
        next: (data: any) => {
          this.product = data;
          this.getproductCate()
        },
        error: error => this.errorMessage = error
      })


    })

  }



  goToproductID(id: any) {
    this.router.navigate(["/store/Shop", id])
  }
  getproductCate() {

    this.categoriesName = this.product.filter((producta: any) => producta.category == this.categorieid);


  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getproductCate();
  }



  addToCart(id: any) {
    this.CartService.addToCart(id, this.product, "alertAdd", "alertNotadded")
  }

}
