import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {Blog} from "../../../services/blog.model";
import {Router} from "@angular/router";

//https://www.onooks.com/error-error-uncaught-in-promise-error-cannot-match-any-routes-url-segment-browse/
/* using [routerLink] was throwing error in express logs - replacing with variation of routerLink solved issue*/
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  list?: Blog[];

  constructor(
    private blogService: BlogService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.blogService.getAllBlogPosts()
      .subscribe(next => {
      this.list = next;
    });
  }

  onClick(blog: Blog) {
    this.router.navigateByUrl(`/blog/${blog.key}`);
  }
}
