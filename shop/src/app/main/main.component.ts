import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Ioffers, Iproducts } from '../interfaces/products';
import { Router} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  constructor(private proudctService:ProductsService ,private router:Router,private CartService:CartService ){}

  sale:number=50;
  priceOffer:number=.3;
  bgImg:string="assets/img/img/8.jpg";
  titleOfDailyOffer:string="Hikan Strwaberry";
  textOfDailyOffer:string="Quisquam minus maiores repudiandae nobis, minima saepe id, fugit ullam similique! Beatae, minima quisquam molestias facere ea. Perspiciatis unde omnis iste natus error sit voluptatem accusant";
  titleOfMonthlyOffer:string="December sale is on!";
  textOfMonthlyOffer:string=" with big";
  text2OfMonthlyOffer:string="Discount...";
  textOfMonthlySale:number=.5;
  sectionProudcts:any;
  err:any;
  sectionOfOffer:Ioffers=
                    {
                      offers:
                      [
                        {offer:"Free Shipping",textOffer:"When order over"},
                        {offer:"24/7 Support",textOffer:"Get support all day"},
                        {offer:"Refund",textOffer:"Get refund within 3 days!"}
                      ]
                    };
ngOnInit():void
  {
    this.proudctService.getAllproducts().subscribe(
      {
        next: data => {
          this.sectionProudcts = data
          this.sectionProudcts.sort((a: any, b: any) => b.discountPercentage - a.discountPercentage);
          this.sectionProudcts = this.sectionProudcts.slice(0, 3);

        },

        error: err => this.err = err
      }
    )
    console.log(this.sectionProudcts)
  }
  goToproductID(id: any) {
    this.router.navigate(["/store/Shop", id])
  }


  addToCart(id:any){
    this.CartService.addToCart(id, this.sectionProudcts ,"alertAdd","alertNotadded")
  }
}
