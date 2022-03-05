import {Component, Inject, Injector, OnInit, PLATFORM_ID} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaTagService: Meta
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle("Edwin M. Cruz: Lead Software Engineer delivering cloud solutions using Java and Typescript.");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: "Expert on Spring, Hibernate, Ehcache, and Angular frameworks. " +
          "An Agile practitioner with many years of experience using Jira, TTD, and BDD. " +
          "Team leader and contributor who believes collaboration, sharing ideas, and mentoring lead to better team culture and software. " +
          "Team-player who can also work independently and enjoys all hands-on/hands-off duties of the software development process. " +
          "Motivated to drive the use of best practices, methodologies and processes that improve the team and software that include CI/CD, and pair programming. "
      }
    );
  }

}
