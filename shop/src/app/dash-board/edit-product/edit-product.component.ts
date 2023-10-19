import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray,FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  SingleProductdata: any = {};
  SingleProductID:any;
  errorMessage: any;
   productForm: FormGroup;
   
constructor(private DashboardService:DashboardService,private formBuilder: FormBuilder,private ProductsService: ProductsService,private activated: ActivatedRoute){}

ngOnInit(): void {
  this.SingleProductID = this.activated.snapshot.paramMap.get('id')
  console.log(this.SingleProductID)
  this.getproductID() 
   
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null],
      images: [null]
    });

}


  getproductID() {
   
    this.ProductsService.getproductID(this.SingleProductID).subscribe({
      next: (data: any) => {
        this.SingleProductdata = data
          
         this.productForm.patchValue({
           // Replace with the actual property names
           title: this.SingleProductdata['title'],
          description: this.SingleProductdata['description'],
          price: this.SingleProductdata['price'],
          discountPercentage: this.SingleProductdata['discountPercentage'],
          stock: this.SingleProductdata['stock'],
          brand: this.SingleProductdata['brand'],
          category: this.SingleProductdata['category'],
           
        });
      }, error: error => this.errorMessage = error
    })

  }


  onSubmit() {
    console.log(this.productForm.value)
    if (this.productForm.valid) {
      const formData = new FormData();

      const images = this.productForm.get('images')?.value;
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
      
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });
      this.updateproduct(this.SingleProductID,formData)
      
    } else {
      console.error('Error updateing product')
    }
  }
  updateproduct(productId:number,productData: FormData) {
    this.DashboardService.updateproduct(productId,productData).subscribe({
      next: (data: any) => {
        console.log('Product updated successfully', data);
      },
      error: (error) => console.error('Error adding product', error)
    });
  }

  onThumbnailChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.productForm.get('thumbnail')?.setValue(inputElement.files[0]);
    }
  }
  onImagesChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // Update the "images" field with the FileList
      this.productForm.get('images')?.setValue(inputElement.files);
    }
  }
}

