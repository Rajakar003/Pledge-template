import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[changeClass]'
})
export class ChangeClassDirective implements OnInit {

  @Input('changeClass') changeClass: string;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {  }

  ngOnInit() {
    this.setAndRemoveClass(this.changeClass)
  }

  setAndRemoveClass(className: string) {
    this.renderer.addClass(this.elementRef.nativeElement, className);
    setTimeout(() => {
      //remove the aaa class after 5 seconds
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    }, 500);
  }
}