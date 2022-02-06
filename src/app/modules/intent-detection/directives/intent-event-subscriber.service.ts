import {Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef,} from '@angular/core';

import {IntentEventPublisherService} from '../services/intent-event-publisher.service';
import {ComponentLocation, IntentInfo} from '../model/intent-event.interface';
import {DOCUMENT} from "@angular/common";
import {
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {XpAnimations} from "./animations";

//https://stackblitz.com/edit/angular-animation-directive-ad?file=src%2Fapp%2Fdirectives%2Fanimation.directive.ts
@Directive({
  selector: '[intentSub]',
})
export class IntentSubDirective implements OnInit {
  player: AnimationPlayer | undefined;
  private eleAnimationsIn = 'fade_in';
  private eleAnimationsOut = 'rotate_animation';
  private viewInitialized = false;

  @Input() intentSub: string | undefined;

  constructor(
    private intentPublisher: IntentEventPublisherService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document,
    private builder: AnimationBuilder,
  ) {
    this.container.createEmbeddedView(this.template);
    intentPublisher.event$.subscribe((next) => this.onIntentUpdate(next));
  }

  ngOnInit(): void {
  }

  onIntentUpdate(next: IntentInfo): void {
    let matCardElem: Element = this.template.elementRef.nativeElement.previousElementSibling;
    const rect = this.getBoundingClientRect(matCardElem);


    // @ts-ignore
    const componentLocationOnX = this.getComponentRelativeLocation(next?.mouseInfo.posX, next.scrollInfo.scrollX, rect.right, rect.left);
    // @ts-ignore
    const componentLocationOnY = this.getComponentRelativeLocation(next?.mouseInfo.posY, next.scrollInfo.scrollY, rect.bottom, rect.top);
    const location: ComponentLocation = this.getLocation(componentLocationOnX, componentLocationOnY);
    this.displayBoundingClientRect(matCardElem, rect, location);

    if (next.direction===location.valueOf()){
      // math should be down to confirm line generated by gesture overlaps with component
      this.inFieldOfView(matCardElem);
    } else {
      this.outFieldOfView(matCardElem);
    }

  }


  private getLocation(componentLocationOnX: number, componentLocationOnY: number) {
    if (componentLocationOnY > 0) {
      if (componentLocationOnX == 0) {
        return ComponentLocation.BELOW
      } else {
        return componentLocationOnX > 0 ? ComponentLocation.BELOW_RIGHT : ComponentLocation.BELOW_LEFT;
      }
    }
    if (componentLocationOnY < 0) {
      if (componentLocationOnX == 0) {
        return ComponentLocation.ABOVE
      } else {
        return componentLocationOnX > 0 ? ComponentLocation.ABOVE_RIGHT : ComponentLocation.ABOVE_LEFT;
      }
    } else {
      if (componentLocationOnX == 0) {
        return ComponentLocation.INSIDE;
      } else {
        return componentLocationOnX > 0 ? ComponentLocation.RIGHT : ComponentLocation.LEFT;
      }
    }

  }

  private getComponentRelativeLocation(mousePosition: number, scrollDelta: number, uCord: number, lCord: number): number {
    const mousePos = mousePosition - scrollDelta;

    if (mousePos > uCord) {
      if (mousePos > lCord) {
        return -1;
      }
      return 0;
    } else {
      if (mousePos < lCord) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  getBoundingClientRect(matCardElem: Element): DOMRect {
    const rect = (matCardElem as HTMLElement).getBoundingClientRect();
    return rect;
  }

  displayBoundingClientRect(matCardElem: Element, rect: DOMRect, location: ComponentLocation) {
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
    let para = document.createElement('p');
    // @ts-ignore
    para.textContent = `location : ${location}`;
    (contentElem as HTMLElement).appendChild(para);
  }


  inFieldOfView(el:Element): void {
    if (this.eleAnimationsIn&& this.viewInitialized==false ) {
      if (this.player) {
        this.player.destroy();
      }
      if (XpAnimations[this.eleAnimationsIn]) {
        const metadata = XpAnimations[this.eleAnimationsIn];
        const factory = this.builder.build(metadata);
        const player = factory.create(el);
        player.play();
      } else {
        throw new Error(`Invalid animation  ${this.eleAnimationsIn}`);
      }
    }
    this.viewInitialized=true;
  }

  outFieldOfView(el:Element): void {
    if (this.eleAnimationsOut && this.viewInitialized==true) {
      if (this.player) {
        this.player.destroy();
      }
      if (XpAnimations[this.eleAnimationsOut]) {
        const metadata = XpAnimations[this.eleAnimationsOut];
        const factory = this.builder.build(metadata);
        const player = factory.create(el);
        player.play();
      } else {
        throw new Error(`Invalid animation  ${this.eleAnimationsOut}`);
      }
      this.viewInitialized=false
    }
  }


}




