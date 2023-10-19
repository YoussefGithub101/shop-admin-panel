import { user } from './../interfaces/user';
import { Observable, BehaviorSubject, first } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
   providedIn: 'root'
})
export class UserService {


   userData: any = new BehaviorSubject(null)
   username:string;
   constructor(private http: HttpClient, public _Router: Router) {


      if (localStorage.getItem("data") != null) {
         this.saveUserData()
      }


   }

   saveUserData(): any {
      let data = JSON.stringify(localStorage.getItem("data"))
      this.userData.next(jwtDecode(data))
      this.username = this.userData.value.user.firstName
   }


   userIdData(): any {
      let data = JSON.stringify(localStorage.getItem("data"))
      this.userData.next(jwtDecode(data))
      return this.userData.value.user._id
   }


   logOut() {
      localStorage.removeItem("data")
      localStorage.removeItem("myCart")
      localStorage.removeItem("__paypal_storage__")
      this.userData.next(null)
      this._Router.navigate(["login"])
   }

   register(formData: object): Observable<any> {
      return this.http.post(`http://localhost:8080/signup`, formData)
   }
   loginn(formData: object): Observable<any> {
      return this.http.post(`http://localhost:8080/login`, formData)
   }
   payment(formData: object): Observable<any> {
      return this.http.post(`http://localhost:8080/order`, formData)
   }

}
