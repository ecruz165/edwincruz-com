import {Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef,} from '@angular/core';

import {IntentEventPublisherService} from '../services/intent-event-publisher.service';
import {ComponentLocation, GestureDirection, IntentInfo} from '../model/intent-event.interface';
import {DOCUMENT} from "@angular/common";
import {AnimationBuilder, AnimationPlayer,} from '@angular/animations';
import {XpAnimations} from "./animations";

//https://stackblitz.com/edit/angular-animation-directive-ad?file=src%2Fapp%2Fdirectives%2Fanimation.directive.ts
//https://codepen.io/MarioDesigns/pen/woJgeo
@Directive({
  selector: '[intentSub]',
})
export class IntentSubDirective implements OnInit {
  player: AnimationPlayer | undefined;
  private eleAnimationIn = 'fade_in';
  private eleAnimationOut = 'rotate_animation';
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

    const componentLocationOnX = this.getComponentRelativeLocation(next?.mouseInfo.posX, next.scrollInfo.scrollX, rect.right, rect.left);
    const componentLocationOnY = this.getComponentRelativeLocation(next?.mouseInfo.posY, next.scrollInfo.scrollY, rect.bottom, rect.top);
    const location: ComponentLocation = this.getLocation(componentLocationOnX, componentLocationOnY);
    const componentAlignmentX: number = this.getAlignmentX(rect, next);

   // this.displayBoundingClientRect(matCardElem, rect, location, componentAlignmentX);

    if (this.viewInitialized == true && next.direction !== location.valueOf()) {
      this.outFieldOfView(matCardElem);
    }

    // math should be down to confirm line generated by gesture overlaps with component
    if (this.viewInitialized == false && next.direction === location.valueOf()) {
      if (componentAlignmentX === next.alignmentX && this.doesIntercept(rect, next)) {
        this.inFieldOfView(matCardElem);
      } else if (componentAlignmentX === 0) {
        if (next.alignmentX === 1 && next.mouseInfo.posXChange < 0 && this.doesIntercept(rect, next)) {
          this.inFieldOfView(matCardElem);
        } else if (next.alignmentX === -1 && next.mouseInfo.posXChange > 0 && this.doesIntercept(rect, next)) {
          this.inFieldOfView(matCardElem);
        }
      }
    }

  }

  doesIntercept(rect: DOMRect, next: IntentInfo) {
    const posX = next.mouseInfo.posX;
    const posY = next.mouseInfo.posY;
    const posXChange = next.mouseInfo.posXChange;
    const posYChange = next.mouseInfo.posYChange;

    switch (next.direction) {
      case GestureDirection.NORTH_EAST: {
        const adjustedPosX1 = posX + (Math.abs(posXChange / posYChange)) * (posY - rect.bottom);
        const adjustedPosX2 = posX + (Math.abs(posXChange / posYChange)) * (posY - rect.top);

        if (adjustedPosX1 >= rect.left && adjustedPosX1 <= rect.right) {
          return true;
        } else if (adjustedPosX2 >= rect.left && adjustedPosX2 <= rect.right) {
          return true;
        } else if ( adjustedPosX2 >= rect.right) {
          return true;
        }
        return false;
        break;
      }
      case GestureDirection.SOUTH_EAST: {
        const adjustedPosX1 = posX + (Math.abs(posXChange / posYChange)) * (rect.top - posY);
        const adjustedPosX2 = posX + (Math.abs(posXChange / posYChange)) * (rect.bottom - posY);

        if (adjustedPosX1 >= rect.left && adjustedPosX1 <= rect.right) {
          return true;
        } else if (adjustedPosX2 >= rect.left && adjustedPosX2 <= rect.right) {
          return true;
        } else if (adjustedPosX2 >= rect.right ) {
          return true;
        }
        return false;
        break;
      }
      case GestureDirection.SOUTH_WEST: {
        const adjustedPosX1 = posX + (Math.abs(posXChange / posYChange)) * (rect.top - posY);
        const adjustedPosX2 = posX + (Math.abs(posXChange / posYChange)) * (rect.bottom - posY);

        if (adjustedPosX1 >= rect.left && adjustedPosX1 <= rect.right) {
          return true;
        } else if (adjustedPosX2 >= rect.left && adjustedPosX2 <= rect.right) {
          return true;
        } else if ( adjustedPosX2 <= rect.left ) {
          return true;
        }
        return false;
        break;
      }
      case GestureDirection.NORTH_WEST: {
        const adjustedPosX1 = posX + (Math.abs(posXChange / posYChange)) * (rect.top - posY);
        const adjustedPosX2 = posX + (Math.abs(posXChange / posYChange)) * (rect.bottom - posY);

        if (adjustedPosX1 >= rect.left && adjustedPosX1 <= rect.right) {
          return true;
        } else if (adjustedPosX2 >= rect.left && adjustedPosX2 <= rect.right) {
          return true;
        } else if (adjustedPosX1 <= rect.right) {

          return true;
        }
        return false;
        break;
      }
    }
    return true;
  }

  inFieldOfView(el: Element): void {
    if (this.eleAnimationIn) {
      if (this.player) {
        this.player.destroy();
      }
      if (XpAnimations[this.eleAnimationIn]) {
        const metadata = XpAnimations[this.eleAnimationIn];
        const factory = this.builder.build(metadata);
        const player = factory.create(el);
        player.play();
      } else {
        throw new Error(`Invalid animation  ${this.eleAnimationIn}`);
      }
    }
    this.viewInitialized = true;
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

  displayBoundingClientRect(matCardElem: Element, rect: DOMRect, location: ComponentLocation, alignmentX: number) {
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
    para.textContent = `location : ${location}`;
    (contentElem as HTMLElement).appendChild(para);

    let para2 = document.createElement('p');
    para2.textContent = `alignmentX : ${alignmentX}`;
    (contentElem as HTMLElement).appendChild(para2);

  }


  outFieldOfView(el: Element): void {
    if (this.eleAnimationOut) {
      if (this.player) {
        this.player.destroy();
      }
      if (XpAnimations[this.eleAnimationOut]) {
        const metadata = XpAnimations[this.eleAnimationOut];
        const factory = this.builder.build(metadata);
        const player = factory.create(el);
        player.play();
      } else {
        throw new Error(`Invalid animation  ${this.eleAnimationOut}`);
      }
      this.viewInitialized = false;
    }
  }

  private getAlignmentX(rect: DOMRect, next: IntentInfo) {
    const midScreenX = document.body.clientWidth / 2;
    return (midScreenX > rect.right) ? -1 : (midScreenX < rect.left ? 1 : 0);
  }

}
