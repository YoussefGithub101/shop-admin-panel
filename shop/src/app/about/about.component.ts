import { Component } from '@angular/core';
import { IsectionAbout } from '../interfaces/products';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  constructor(private title: Title) { }
  ngOnInit() {
    this.title.setTitle('About')
  }
  textAbout: string = "We sale The Best Original Products";
  aboutUs: string = "About Us";
  monthlyOffer: string = "December sale is on! ";
  saleMonthly: number = .5;
  sectionAbout: IsectionAbout =
    {
      about:
        [
          { advantg: "Home Delivery", text: "sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.", fav: "fas fa-shipping-fast" },
          { advantg: "Best Price", text: "sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.", fav: "fas fa-money-bill-alt" },
          { advantg: "Custom Box", text: "sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.", fav: "fas fa-briefcase" },
          { advantg: "Quick Refund", text: "sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.", fav: "fas fa-sync-alt" },

        ]
    }
}
