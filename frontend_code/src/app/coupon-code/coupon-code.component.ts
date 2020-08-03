import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.scss']
})
export class CouponCodeComponent implements OnInit {

  constructor(private myService:MyserviceService) { }
  fetchUsers$:Observable<any>;

  ngOnInit(): void {
    this._fetchUsers();
  }
  private _fetchUsers(){
    this.fetchUsers$ = this.myService.userFetch();
  }

}
