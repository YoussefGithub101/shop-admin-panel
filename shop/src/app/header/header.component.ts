import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
/* import { FormControl } from '@angular/forms'; */
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnDestroy  {
  /* inputValue: FormControl = new FormControl(); */


  name: string = "";
  islogin: boolean = false;
/*   cartCount: number; */
  cartData: any = localStorage.getItem("myCart")

  constructor(public _userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, public CartService: CartService) {
/*     this.cartCount = this.CartService.totalQuantity */
  }


  goCategorie(search: string) {
    this.router.navigate(["store/Shop/search/", search], { relativeTo: this.activatedRoute })
  }


  ngOnInit(): void {
    
    this.cartData = JSON.parse(this.cartData)
    this._userService.userData.subscribe(() => {
      if (this._userService.userData.getValue() != null) {
        this.islogin = true;
     /*    this.name = this._userService.saveUserData() */
        console.log(this.name)

      }
      else {
        this.islogin = false;


      }
    })
    
  }

  ngOnDestroy() {
    this._userService.saveUserData().unsubscribe();
  }



  logOut() {
    this._userService.logOut()
    this.CartService.totalQuantity=0
  }

}
