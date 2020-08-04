import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-capture-pop',
  templateUrl: './capture-pop.component.html',
  styleUrls: ['./capture-pop.component.scss']
})
export class CapturePopComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
