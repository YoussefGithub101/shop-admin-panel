import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iproducts } from "../interfaces/products"
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  DeleteProduct(productId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/product/delete/${productId}`)
 }


 addproduct(productData:object):Observable<any>{
  return this.http.post(`http://localhost:8080/product`, productData)
 }
 updateproduct(productId: number,productData:object):Observable<any>{
  return this.http.patch(`http://localhost:8080/product/${productId}`, productData)
 }

}
