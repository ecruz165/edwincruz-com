import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, from, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarkdownConverterService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  convert(resourceRelUrl: string): Observable<string> {
    const parseMarkdown: Promise<string> = this.getMarkdownByPath(resourceRelUrl)
      .then(this.parseMarkdown)
    return from(parseMarkdown);
  }

  private async parseMarkdown(markdownString: string) {
    const marked = require('marked');
    const hljs = require('highlight.js');
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
      xhtml: true
    });
    let html$ = of(marked.parse(markdownString));
    return await firstValueFrom(html$)
      .then(value => value.toString());
  }

  private async getMarkdownByPath(path: string): Promise<string> {
    // @ts-ignore
    let markdown$ = this.httpClient.get<string>(path, {responseType: "text"});
    return await firstValueFrom(markdown$)
      .then(value => value.toString());
  }

}
