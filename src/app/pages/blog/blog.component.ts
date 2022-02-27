import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../services/blog.model";
import {MarkdownConverterService} from "../../services/markdown-converter.service";
import {filter, Observable, of, switchMap} from "rxjs";
import {take, tap} from "rxjs/operators";

function isDefined<T>(arg: T | null | undefined): arg is T {
  return arg !== null && arg !== undefined;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  url: string = '';
  blog?: Blog;
  parsedMarkdown: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private markdownConverterService: MarkdownConverterService) {
  }

  ngOnInit(): void {
      this.getBlogKeyFromPath()
        .pipe(
          switchMap(key => this.findBlogByKey(key)),
          switchMap( blog => this.loadBlogAsConvertedMarkdown(blog.postPath+blog.postFileName))
        ).subscribe( next =>{
          this.parsedMarkdown = next;
      })
  }

  private getBlogKeyFromPath(): Observable<string> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined && id !== null && id.length ! > 10) {
      return of(id);
    } else {
      throw Error('invalid blog key');
    }
  }

  private findBlogByKey(key: string): Observable<Blog> {
    return this.blogService.getBlogPostByKey(key)
      .pipe(
        filter(isDefined),
        take(1),
        tap(blog=> this.blog = blog)
      )
  }

  private loadBlogAsConvertedMarkdown(url: string): Observable<string> {
    return this.markdownConverterService.convert(url);
  }

}
