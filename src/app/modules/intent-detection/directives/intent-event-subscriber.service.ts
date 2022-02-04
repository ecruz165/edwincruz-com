import {Directive, Input, OnInit, TemplateRef, ViewContainerRef,} from '@angular/core';

import {IntentEventPublisherService} from '../services/intent-event-publisher.service';
import {IntentInfo} from '../model/intent-event.interface';

@Directive({
  selector: '[intentSub]',
})
export class IntentSubDirective implements OnInit {
  // private currentAnimation;
  //private isInFieldOfView = false;
  //private el: ElementRef | undefined;
  @Input() intentSub: string | undefined;

  constructor(
    private intentPublisher: IntentEventPublisherService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    this.container.createEmbeddedView(this.template);
    intentPublisher.event$.subscribe((next) => this.onIntentUpdate(next));
  }

  ngOnInit(): void {
  }

  onIntentUpdate(next: IntentInfo): void {
    // window resize or viewport change can affect width of component
    this.updateBoundingClientRect();
    //Some event has occurred
  }

  updateBoundingClientRect() {
    let matCardElem: Element = this.template.elementRef.nativeElement.previousElementSibling;
    const rect = (matCardElem as HTMLElement).getBoundingClientRect();
    let contentElem = matCardElem.firstElementChild;

    (contentElem as HTMLElement).innerHTML = '';
    for (let key in rect) {
      // @ts-ignore
      if ('function' !== typeof rect[key]) {
        let para = document.createElement('p');
        // @ts-ignore
        para.textContent = `${key} : ${rect[key]}`;
        (contentElem as HTMLElement).appendChild(para);
      }
    }
  }

}

/*
    const rect = elem.getBoundingClientRect();
    const innerElem = elem.firstChild.firstChild;
    console.log(innerElem);

    innerElem?.parentElement?.replaceWith(para)
*/

/*
  ngOnInit(): void {
    //this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.el = this.viewContainerRef.createEmbeddedView(
      this.templateRef
    ).rootNodes[0];
*/
//const el = this.templateRef.elementRef.nativeElement.nextElementSibling;
//    console.log(this.el);

//    this.renderer.listen(this.el, 'mousemove', this.onMouseMove);

/*
  drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
*/
// Directive needs to listen to a subject
// Is mouse if on left or right side of page?
// What direction mouse is moving

// Where is this component on page?
// What are the boudaries of component?
//     x : 258
//     y : -217
//     width : 440
//     height : 240
//     top : -217
//     right : 698
//     bottom : 23
//     left : 258
// #### if Hemisphere aware && Is component on same half of mouse pointer?
// Is compoennt in vieable area?
// is component above, paralell or below mouse
// Is mouse moving in direction of component?
// If yes
//    if already displaying do nothing
//    hide other  components
//    display this component

// Does slope of mouse intersect boundaries of component?

//

// of the movement
/*
public update() {
  const container = document.getElementById('controls');
  const elem = document.getElementById('example');
  const rect = elem.getBoundingClientRect();

  container.innerHTML = '';
  for (let key in rect) {
    if (typeof rect[key] !== 'function') {
      let para = document.createElement('p');
      para.textContent = `${key} : ${rect[key]}`;
      container.appendChild(para);
    }
  }
}

private inFieldOfView(): void {
  if (this.currentAnimation) {
    this.currentAnimation.cancel();
  }
  this.currentAnimation = this.el.nativeElement
    .animate({
      scale: { x: 0.98, y: 0.98 },
      opacity: 0.8,
      //    curve: AnimationCurve.easeIn,
      duration: 100,
    })
    .catch((e) => {});
}

private outFieldOfView(): void {
  if (this.currentAnimation) {
    this.currentAnimation.cancel();
  }
  this.currentAnimation = this.el.nativeElement
    .animate({
      scale: { x: 1, y: 1 },
      opacity: 1,
      //    curve: AnimationCurve.easeIn,
      duration: 100,
    })
    .catch((e) => {});
}*/
