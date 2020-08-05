import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  httpService : any;
  private _userId:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http:HttpClient) {
   }
    apiBaseUrl = "http://localhost:8006" ;

    ChatBot(formData:any){
      console.log("chat api hit")
       return this.http.post(`${this.apiBaseUrl}/sendmsg`, formData)
   }
   signUp(formData) {
    return this.http.post<any>(`${this.apiBaseUrl}/SignUp`, formData)
    .pipe(shareReplay())
    .subscribe((res)=>{
      this._userId.next(res.userId);
    })
   }
   clientImage(formData){

    return this.http.post(`${this.apiBaseUrl}/ClientImage`, formData)
   }
   photo(formData){
     console.log('formData',formData);
     return this.http.post<any>(`${this.apiBaseUrl}/photo`, formData)
   }
   signaturestring(formData){
    console.log('formData',formData);
    return this.http.post<any>(`${this.apiBaseUrl}/signaturestring`, formData)
  }

  fetchCountUsers():Observable<any>{
    return this.http.get(`${this.apiBaseUrl}/CountUsers`)
   }
   userFetch():Observable<any>{
     return this.http.get(`${this.apiBaseUrl}/FetchClientInfo`)
   }
   fetchphoto():Observable<any>{
    return this.http.get(`${this.apiBaseUrl}/fetchphoto`)
  }
  promoCode():Observable<any>{
    return this.http.get(`${this.apiBaseUrl}/CouponCode`)
  }



   get userId():Observable<string>{
      return this._userId.asObservable();
   }


  }