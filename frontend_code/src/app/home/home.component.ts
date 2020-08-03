import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private myService:MyserviceService) { }
  countUsers$:Observable<any>;
  fetchUsers$:Observable<any>;

  ngOnInit(): void {
    $(document).ready(function() {
      $('.img_4').addClass('small');
      $('.img_4').each(function(){
      $(this).delay(1000).queue(function(){
        $(this).addClass('slow');
      });
      });
    })

    this._fetchCountUsers();
    this._fetchUsers();
  }

  private _fetchCountUsers() {
    this.countUsers$ = this.myService.fetchCountUsers();
  }
  private _fetchUsers(){
    this.fetchUsers$ = this.myService.userFetch();
  }

}
