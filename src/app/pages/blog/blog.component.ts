import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../services/blog.model";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  url: string = '';
  blog?: Blog;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private route: ActivatedRoute,
    private blogService: BlogService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined && id !== null) {
      this.blogService.getBlogPostByKey(id)
        .subscribe(next => {
          this.blog = next;
          if (next != undefined){
            this.url = next.postPath + next.postFileName;
          }
        })
    }
  }

}
