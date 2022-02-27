import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpRequestDataService} from "./http-request-data.service";
import {firstValueFrom, from, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarkdownConverterService {

  constructor(
    private httpClient: HttpClient,
    private httpRequestDataService: HttpRequestDataService,
  ) {

  }

  convert(resourceRelUrl: string): Observable<string> {
    const markdownUrl = this.composeUMarkdownUrl(resourceRelUrl);
    const parseMarkdown: Promise<string> = this.getMarkdownByPath(markdownUrl)
      .then(this.parseMarkdown)
      .then(this.setValues);

    return from(parseMarkdown);
  }

  private setValues(html: string): string {
    return html;
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
    let result = await firstValueFrom(html$).then(value => {
      return value
    });
    const resultString: string = result.toString();
    return resultString;
  }

  private async getMarkdownByPath(path: string): Promise<string> {
    // @ts-ignore
    let markdown$ = this.httpClient.get<string>(path, {responseType: 'text'})
    let result = await firstValueFrom(markdown$).then(value => {
      return value
    });
    const resultString: string = result.toString();
    return resultString;
  }

  private composeUMarkdownUrl(resourceRelUrl: string): string {
    const baseUrl = this.httpRequestDataService.getApplicationUrl();
    const url = `${baseUrl}${resourceRelUrl}`;
    return url
  }

}
