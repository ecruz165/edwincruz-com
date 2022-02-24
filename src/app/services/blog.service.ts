import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Blog} from './blog.model';
import {catchError, filter, map, Observable, throwError} from 'rxjs';
import {take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {

  }

  public getAllBlogPosts(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>('/docs/blog/_blog-data.json')
  }

  public getBlogPostByKey(key: string) {
    return this.httpClient.get<Blog[]>('/docs/blog/_blog-data.json')
      .pipe(
        map(blogList => {
          return blogList.find(blog => {
            return blog.key === key;
          })
        }
        )
      );
  }

}
