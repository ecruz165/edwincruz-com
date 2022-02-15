import {Directive, Input, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {animate, AnimationBuilder, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";
import {ɵAnimationEngine as AnimationEngine} from '@angular/animations/browser';

//https://github.com/angular/angular/issues/9947#issuecomment-295729092

export const FadeInAnimation: AnimationTriggerMetadata =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('FadeInAnimation', [

    // route 'enter' transition
    transition(':enter', [

      // css styles at start of transition
      style({opacity: 0}),

      // animation and styles at end of transition
      animate('.3s', style({opacity: 1}))
    ]),
  ]);

export const FadeOutAnimation: AnimationTriggerMetadata =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('FadeInAnimation', [

    // route 'enter' transition
    transition(':leave', [

      // css styles at start of transition
      style({opacity: 1}),

      // animation and styles at end of transition
      animate('.3s', style({opacity: 0}))
    ]),
  ]);

@Directive({
  selector: '[visibilityCloak]'
})
export class VisibilityCloakDirective {

  @Input() visibilityCloak: string | undefined;

  constructor(
    private animationEngine: AnimationEngine,
    private renderer: Renderer2,
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private builder: AnimationBuilder,
  ) {

    this.container.createEmbeddedView(this.template);

    const componentNativeElem = this.template.elementRef.nativeElement;
    const matCardElemRef = componentNativeElem.previousElementSibling.firstChild;
    const matCardContentElemRef = matCardElemRef.firstChild?.nextSibling;

    const componentId = '23232'
    const namespaceId = (<any>renderer).delegate._namespaceId; /* this is a hack and
        the property '_namespaceId' is only available on AnimationRenderer and
        not DefaultDomRenderer2 */
    const name = 'animation';

    const parentAnimatino = this.animationEngine.registerTrigger(
      componentId,
      namespaceId,
      matCardContentElemRef,
      name,
      FadeInAnimation
    );







  }
}

/*
  state = '';
  animations = [
    trigger('theParentAnimation', [
      state('enter', style({
        transform: 'translateY( 100% ) translateZ( 0 )',
      })),
      state('leave', style({
        transform: 'translateY( 0% ) translateZ( 0 )',
      })),
      transition('* <=> *', [
        group([
          query('@theChildAnimation', animateChild()),
          animate('.4s', keyframes([
            style({margin: '0 0 158px 0'}),
            style({margin: '0 0 32px 0'}),
          ])),
        ]),
      ]),
    ]),
    trigger('theChildAnimation', ),
  ]
*
*     const matCardPlayShow = this.createMatCardPlayer(matCardElemRef, 'fade_in_offset');
    const matCardContentPlayShow = this.createMatCardPlayer(matCardContentElemRef, 'fade_in');
    matCardElemRef.addEventListener('mouseenter', (event: MouseEvent) => {
      this.animateShow(event, matCardPlayShow, matCardContentPlayShow);
    }, false);

    const matCardPlayHide = this.createMatCardPlayer(matCardElemRef, 'fade_out_offset');
    const matCardContentPlayHide = this.createMatCardPlayer(matCardContentElemRef, 'fade_out');
    matCardElemRef.addEventListener('mouseleave', (event: MouseEvent) => {
      this.animateHide(event, matCardPlayHide, matCardContentPlayHide);
    }, false);

  }

  animateShow(event: MouseEvent, matCardAnimation: AnimationPlayer | undefined, matCardContentAnimation: AnimationPlayer | undefined) {
    matCardContentAnimation?.play();
    matCardAnimation?.play();
  }

  animateHide(event: MouseEvent, matCardAnimation: AnimationPlayer | undefined, matCardContentAnimation: AnimationPlayer | undefined) {
    matCardContentAnimation?.play();
    matCardAnimation?.play();
  }

  private createMatCardPlayer(elem: Element, animation: string) {
      const factory = this.builder.build(this.animations);
      return factory.create(elem);
  }
* */
