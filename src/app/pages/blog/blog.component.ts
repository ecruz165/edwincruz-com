import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../services/blog.model";
import {MarkdownConverterService} from "../../services/markdown-converter.service";
import {filter, Observable, of, switchMap} from "rxjs";
import {take, tap} from "rxjs/operators";
import {DomSanitizer, Meta, SafeHtml, Title} from "@angular/platform-browser";

function isDefined<T>(arg: T | null | undefined): arg is T {
  return arg !== null && arg !== undefined;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blog?: Blog;
  parsedMarkdown: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private markdownConverterService: MarkdownConverterService,
    private sanitized: DomSanitizer,
    private titleService: Title,
    private metaTagService: Meta
  ) {
  }

  ngOnInit(): void {

    this.getBlogKeyFromPath()
      .pipe(
        switchMap(key => this.findBlogByKey(key)),
        tap (blog => {
          this.titleService.setTitle(blog.title);
          this.metaTagService.updateTag(
            {
              name: 'description',
              content: blog.description
            });
        }),
        switchMap(blog => this.markdownConverterService.convert(blog.postPath + blog.postFileName))
      ).subscribe(next => {
      if (isDefined(next)) {
        this.parsedMarkdown = this.sanitized.bypassSecurityTrustHtml(next);
      }
    })

  }

  private getBlogKeyFromPath(): Observable<string> {
    const key = this.route.snapshot.paramMap.get('key');
    if (key !== undefined && key !== null) {
      return of(key);
    } else {
      throw Error('invalid blog key');
    }
  }

  private findBlogByKey(key: string): Observable<Blog> {
    return this.blogService.getBlogPostByKey(key)
      .pipe(
        filter(isDefined),
        take(1),
        tap(blog => this.blog = blog)
      )
  }

}
