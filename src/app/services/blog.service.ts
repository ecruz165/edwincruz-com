import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from './blog.model';
import {map, Observable} from 'rxjs';
import {HttpRequestDataService} from "./http-request-data.service";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseUrl: string;
  constructor(private httpClient: HttpClient,
              private httpRequestDataService: HttpRequestDataService) {


    this.baseUrl = httpRequestDataService.getApplicationUrl();
  }

  public getAllBlogPosts(): Observable<Blog[]> {

    return this.httpClient.get<Blog[]>(`${ this.baseUrl}/docs/blog/_data.json`)
  }

  public getBlogPostByKey(key: string) {
    return this.httpClient.get<Blog[]>(`${ this.baseUrl}/docs/blog/_data.json`)
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
