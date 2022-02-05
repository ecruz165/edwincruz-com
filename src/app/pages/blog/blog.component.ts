import {Component, OnInit} from '@angular/core';
import {IntentEventPublisherService} from "../../modules/intent-detection/services/intent-event-publisher.service";
import {IntentInfo} from "../../modules/intent-detection/model/intent-event.interface";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public intentInfo: IntentInfo | undefined;

  constructor(    private intentPublisher: IntentEventPublisherService) {
    intentPublisher.event$.subscribe((next) => this.onIntentUpdate(next));
  }

  ngOnInit(): void {
  }

  private onIntentUpdate(next: IntentInfo) {
        this.intentInfo = next;
  }

}
