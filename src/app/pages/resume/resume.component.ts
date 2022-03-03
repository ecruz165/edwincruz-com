import {Component, OnInit} from '@angular/core';
import {MarkdownConverterService} from "../../services/markdown-converter.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


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
    private sanitized: DomSanitizer) {
  }

  ngOnInit(): void {

    this.markdownConverterService.convert('/docs/resume/edwin-m-cruz.md')
      .subscribe(next => {
        if (isDefined(next)) {
          this.parsedMarkdown = this.sanitized.bypassSecurityTrustHtml(next);
        }
      });
  }

}
