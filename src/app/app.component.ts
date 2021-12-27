import {Component, OnInit, Inject, Injector, PLATFORM_ID} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Edwin M. Cruz - Lead Software Engineer delivering solutions using Java and Typescript on the AWS Platform.';
  constructor(private titleService: Title,
              private metaTagService: Meta,
              private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      {name: 'description', content: "My name is Edwin M. Cruz and I reside in NYC. I'm a lead software engineer delivering solutions using Java and Typescript on the AWS Platform."}
    );
  }

}
