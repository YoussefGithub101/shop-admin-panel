import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iproducts } from "../interfaces/products"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData: Iproducts[] = [];
  product = [];
  _url = 'http://localhost:8080/product';

  make(token: any): Observable<any> {
    const url = `http://localhost:8080/create-payment-intent`
    return this.http.post(url, { token })

  }
  constructor(private http: HttpClient) { }


  getAllproducts(): Observable<Iproducts[]> {

    return this.http.get<Iproducts[]>(this._url).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }));
  }



  getproductID(SingleProductID: number): Observable<Iproducts[]> {

    return this.http.get<Iproducts[]>(`http://localhost:8080/product/${SingleProductID}`).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }));
  }
  addComment(SingleProductID: number, comment: any): Observable<Iproducts[]> {

    return this.http.post<Iproducts[]>(`http://localhost:8080/product/${SingleProductID}`, comment).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }));
  }




  getproductSearch(SearchID: string): Observable<Iproducts[]> {

    return this.http.get<Iproducts[]>(`http://localhost:8080/search?q=${SearchID}`).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }));
  }





}
