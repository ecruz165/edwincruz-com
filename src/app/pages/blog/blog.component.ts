import {Component, Inject, OnInit} from '@angular/core';
import {IntentEventPublisherService} from "../../modules/intent-detection/services/intent-event-publisher.service";
import {IntentInfo} from "../../modules/intent-detection/model/intent-event.interface";
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public intentInfo: IntentInfo | undefined;

  url: string='';

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private route: ActivatedRoute,
    private intentPublisher: IntentEventPublisherService) {
    intentPublisher.event$.subscribe((next) => this.onIntentUpdate(next));
  }

  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined && id !== null){
      this.url = `/docs/blog/${id}.md`;
      console.log(id);
    }

  }

  private onIntentUpdate(next: IntentInfo) {
        this.intentInfo = next;
  }

}
