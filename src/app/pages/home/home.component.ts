import {Component, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(    private titleService: Title,
                  private metaTagService: Meta
  ) {
  }

  ngOnInit(): void {
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
