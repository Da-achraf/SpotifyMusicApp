import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding, HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import {animation} from "@angular/animations";
import {BehaviorSubject} from "rxjs";

@Directive({
  selector: '[appScrollText]'
})
export class ScrollTextDirective implements OnInit, AfterViewInit, AfterViewChecked{

  innerText$ = new BehaviorSubject<string>('');


  @Input('appScrollText')
  set appScrollText(value: string){
    this.innerText$.next(value);
  }

  width: number = 0;

  shouldBeAnimated: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostBinding('style.animation')
  get animation(){
    return this.shouldBeAnimated ? 'scrollText 10s linear infinite' : '';
  }

  ngOnInit(){

  }

  private defineAnimation() {
    const scrollTextAnimation = this.renderer.createElement('style');

    scrollTextAnimation.innerHTML = `@keyframes scrollText {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }`;

    this.renderer.appendChild(this.el.nativeElement, scrollTextAnimation);
  }

  ngAfterViewInit(): void {
    this.innerText$.subscribe((value) => {
      this.shouldBeAnimated = value.length > 10
      console.log('Should be animated: ', this.shouldBeAnimated)
    })

    this.defineAnimation()
  }

  ngAfterViewChecked(): void {
  }
}
