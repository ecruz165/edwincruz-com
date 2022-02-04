import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntentEventPublisherService} from "./services/intent-event-publisher.service";
import {MouseELService} from "./services/mouse-events-listener.service";
import {WindowELService} from "./services/window-events-listener.service";
import {IntentSubDirective} from "./directives/intent-event-subscriber.service";


@NgModule({
  imports: [CommonModule],
  declarations: [IntentSubDirective],
  exports: [IntentSubDirective],
  providers: [WindowELService, MouseELService, IntentEventPublisherService],
})
export class IntentDetectionModule {
  constructor() {

  }
}
