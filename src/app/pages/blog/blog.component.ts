import {Component, Inject, OnInit} from '@angular/core';
import {IntentEventPublisherService} from "../../modules/intent-detection/services/intent-event-publisher.service";
import {IntentInfo} from "../../modules/intent-detection/model/intent-event.interface";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public intentInfo: IntentInfo | undefined;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private intentPublisher: IntentEventPublisherService) {
    intentPublisher.event$.subscribe((next) => this.onIntentUpdate(next));
  }

  ngOnInit(): void {
  }

  private onIntentUpdate(next: IntentInfo) {
        this.intentInfo = next;
  }

}
