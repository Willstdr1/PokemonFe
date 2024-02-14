import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appHighlightcursor]'
})
export class HighlightcursorDirective {

  constructor(private eleRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {

    this.eleRef.nativeElement.style.color = 'red';

  }

  @HostListener('mouseleave') onMouseLeave() {

    this.eleRef.nativeElement.style.color = 'black';

  }
}  
