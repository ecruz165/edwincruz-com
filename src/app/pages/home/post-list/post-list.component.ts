import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../services/blog.model";
import {BlogService} from "../../../services/blog.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  list?: Blog[];

  constructor(
    private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getAllBlogPosts().subscribe(next => {
      this.list = next;
    });
  }

}
