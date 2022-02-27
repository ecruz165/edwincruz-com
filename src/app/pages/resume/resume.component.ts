import {Component, OnInit} from '@angular/core';
import {MarkdownConverterService} from "../../services/markdown-converter.service";

//https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  parsedMarkdown?: string;

  constructor(private markdownConverterService: MarkdownConverterService) {
  }

  ngOnInit(): void {
    this.markdownConverterService.convert('/docs/resume/edwin-m-cruz.md').subscribe(next => {
      this.parsedMarkdown = next;
    });
  }

}
