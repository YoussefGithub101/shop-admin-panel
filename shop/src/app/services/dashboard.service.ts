import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iproducts } from "../interfaces/products"
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  DeleteProduct(productId: number): Observable<any> {
      return this.http.delete(`https://shop-admin-panel-1.onrender.com/product/delete/${productId}`);
    
 }


 addproduct(productData:object):Observable<any>{
  return this.http.post(`https://shop-admin-panel-1.onrender.com/product`, productData)
 }
 updateproduct(productId: number,productData:object):Observable<any>{
  return this.http.patch(`https://shop-admin-panel-1.onrender.com/product/${productId}`, productData)
 }

}
