import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dash-products',
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.scss']
})
export class DashProductsComponent implements OnInit {
  product:any=[];
  errorMessage: any;

  title='pagination'

  page:number=1;
  count:number=0;
  tableSize:number=4;
  tableSizes:any=[5,10,15,20];
  constructor(private ProductsService:ProductsService ,private DashboardService:DashboardService,public  router:Router){}

  ngOnInit(): void{

    this.getAllproduct()

  }


  getAllproduct(): void{
    this.ProductsService.getAllproducts().subscribe({
      next:(data:any)=>{
        this.product=data
      },error:error=>this.errorMessage=error
    })

  }
  onTableDataChange(event:any){
    this.page=event;
    this.getAllproduct();
  }


  DeleteProduct(ID:number){
    console.log(ID)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.DashboardService.DeleteProduct(ID).subscribe({
          next:(data:any)=>{
            console.log('Product deleted successfully', data);
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
            this.getAllproduct()
          },error:error=>            
            Swal.fire({
              icon: 'warning',
              title: 'Error.',
              text:'sorry only costume products can be deleted.',
            }
 
          )
        })
        
      }
    })

  }
/*   goToproductID(id:any){
    this.router.navigate(["/store/Shop",id])
  } */
  
}
