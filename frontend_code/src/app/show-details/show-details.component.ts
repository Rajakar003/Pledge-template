import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MyserviceService } from '../service/myservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  @ViewChild('signaturePad',{static:false}) signaturePad : SignaturePad;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 100
  };
  private _userId: string;

  constructor(private myService:MyserviceService) { }
  fetchUsers$:Observable<any>;
  fetchphoto$:Observable<any>;
  promoCode$:Observable<any>;

  ngOnInit(): void {
    this._fetchUsers();
    this._fetchphoto();
    this._promoCode();
    this._getUserId();
  }
  private _fetchUsers(){
    this.fetchUsers$ = this.myService.userFetch();
  }
  private _fetchphoto(){
    this.fetchphoto$ = this.myService.fetchphoto();

  }
  private _promoCode(){
    this.promoCode$ = this.myService.promoCode();
  }

  // Signature
// drawClear(){
//   this.signaturePad.clear();
// }
public ngAfterViewInit() {
  // console.log(this.signaturePad);
  // this.signaturePad.set('minWidth', 5);
  // this.signaturePad.clear();
  setTimeout(() => {
    console.log('signature pad', this.signaturePad);
  }, 1000);
}
private _getUserId(){
  this.myService.userId.subscribe(
    userId=>{
      if(userId){
        this._userId = userId;
      }
    }
  )
}
public drawComplete():void {
  console.log(this);
  let signature = this.signaturePad.toDataURL('image/png',0.5);
  console.log('url',signature);
  this.myService.signaturestring({_id:this._userId,sign:signature})
  .subscribe(res=>{
    console.log('res',res);
  })

    // subscribe(()=>{
    //   this.myService.photo({_id:this._userId,sign:signature})
    //   .subscribe(res=>{
    //     console.log(res);
    //   })
    // })
  }
  dataSend(){
    this.myService.pledgePDF({_id:this._userId})
    .subscribe(res=>{
      console.log('res',res);
    })
  }

  drawStart() {
    console.log('begin drawing');
  }


}
