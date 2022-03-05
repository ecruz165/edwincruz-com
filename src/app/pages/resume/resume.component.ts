import {Component, OnInit} from '@angular/core';
import {MarkdownConverterService} from "../../services/markdown-converter.service";
import {DomSanitizer, Meta, SafeHtml, Title} from "@angular/platform-browser";


function isDefined(next: string) {
  if (next !== undefined && next !== null) {
    return true;
  }
  return false;
}

//https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  parsedMarkdown: SafeHtml = '';

  constructor(
    private markdownConverterService: MarkdownConverterService,
    private sanitized: DomSanitizer,
    private titleService: Title,
    private metaTagService: Meta
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Edwin M. Cruz: Resume last updated March 2022");
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

    this.markdownConverterService.convert('/docs/resume/edwin-m-cruz.md')
      .subscribe(next => {
        if (isDefined(next)) {
          this.parsedMarkdown = this.sanitized.bypassSecurityTrustHtml(next);
        }
      });
  }

}
