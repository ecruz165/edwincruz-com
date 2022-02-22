import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss']
})
export class MarkdownViewerComponent implements OnInit {
  @Input()
  pageUrl?: string;
  markdown = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private httpClient: HttpClient,) {
  }

  getMarkdownByPath(path: string): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<string>(path, {responseType: 'text'});
  }

  loadMarkdown(url: string) {
    const marked = require('marked');
    const hljs = require('highlight.js');
    this.getMarkdownByPath(url).subscribe(markdownString => {


      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code: any) {
          return hljs.highlightAuto(code).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
      this.markdown = marked.parse(markdownString);

    })
  }

  ngOnInit(): void {
    const url = this?.pageUrl;
    if (url !== undefined && url !== null) {

      this.loadMarkdown(url);
    }
  }

}
