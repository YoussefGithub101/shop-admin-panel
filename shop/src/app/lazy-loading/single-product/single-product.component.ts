import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  SingleProductdata: any = [];

  commentsOfProudct: any = []
  SingleProductID: any;
  errorMessage: any;
  cartData1: any = [];
  product: any = []
  user: any
  baseUrl: string = 'http://localhost:8080';
  isExternalUrl(url: any): boolean {
    return url.startsWith('http');
  }
  constructor(private title: Title, private activated: ActivatedRoute, private http: HttpClient, private ProductsService: ProductsService, private CartService: CartService, private fb: FormBuilder, private _Router: Router, private userService: UserService) {
    this.cartData1 = ProductsService.cartData
  }

  ngOnInit(): void {
    this.title.setTitle('Proudct Ditails')
    this.SingleProductID = this.activated.snapshot.paramMap.get('id')
    this.getproductSID()
    this.getUser()
  }

  getUser() {
    this.user = this.userService.username
  }

  getproductSID(): void {
    this.ProductsService.getproductID(this.SingleProductID).subscribe({
      next: (data: any) => {
        this.SingleProductdata = data
        console.log(data)
        this.commentsOfProudct = data.comments
        this.product.push(data)
      }, error: error => this.errorMessage = error
    })

  }

  addToCart(id: any) {
    this.CartService.addToCart(id, this.product, "alertAdd", "alertNotadded")
  }

  formComment = new FormControl('')
  pushComment() {
    if (localStorage.getItem('data') != null) {
      if (this.formComment.valid) {
        let comment = { comment: this.user + " : " + this.formComment.value }
        this.ProductsService.addComment(this.SingleProductID, comment).subscribe()
        this.commentsOfProudct.push(this.user + " : " + this.formComment.value)
        Swal.fire("comment success!", "You added new comment", "success");
      }
      else {
        Swal.fire({
          icon: "error",
          title: 'must be between 5-50 letters',
        });
      }

      this.formComment.reset()
    } else {
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
  trackByMethod(index: number, el: any): number {
    return el.id;
  }


}

