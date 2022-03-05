import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {Blog} from "../../../services/blog.model";
import {Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

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
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Edwin M. Cruz: Blog for Aspiring SaaS Product Solopreneurs");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: "Blog postings of my thoughts as a SaaS Product Engineer for aspiring engineers looking to build their own SaaS products."
      }
      );
    this.blogService.getAllBlogPosts()
      .subscribe(next => {
      this.list = next;
    });
  }

  onClick(blog: Blog) {
    this.router.navigateByUrl(`/blog/${blog.key}`);
  }
}
