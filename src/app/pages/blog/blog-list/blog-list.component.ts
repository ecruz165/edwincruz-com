import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {Blog} from "../../../services/blog.model";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  list?:Blog[];

  constructor(
    private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getAllBlogPosts().subscribe(next => {
      this.list = next;
    });
  }

}
