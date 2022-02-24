import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from './blog.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {

  }

  public getAllBlogPosts(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>('/docs/blog/_data.json')
  }

  public getBlogPostByKey(key: string) {
    return this.httpClient.get<Blog[]>('/docs/blog/_data.json')
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
