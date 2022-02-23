import {Component, OnInit} from '@angular/core';

export interface Post {
  key: string;
  title: string;
  description: string;
  postPath: string;
  postFileName: string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList: Post[] = [
    {
      key:'recommended-hardware-specifications-for-java-and-typescript-development',
      title: 'Recommended hardware specifications for Java and Typescript Development',
      description: 'Today\'s entry level computers allow you to do software development. However, if you work on use powerful plugins in your IDE and/or want to do complex projects that require spinning up several components on your local development environment you will benefit from having a mid-level laptop or better.',
      postPath: '/docs/blog/',
      postFileName: 'recommended-hardware-specifications-for-java-and-typescript-development.md'
    },    {
      key:'recommended-hardware-specifications-for-java-and-typescript-development',
      title: 'Recommended hardware specifications for Java and Typescript Development',
      description: 'Today\'s entry level computers allow you to do software development. However, if you work on use powerful plugins in your IDE and/or want to do complex projects that require spinning up several components on your local development environment you will benefit from having a mid-level laptop or better.',
      postPath: '/docs/blog/',
      postFileName: 'recommended-hardware-specifications-for-java-and-typescript-development.md'
    },  {
      key:'recommended-hardware-specifications-for-java-and-typescript-development',
      title: 'Recommended hardware specifications for Java and Typescript Development',
      description: 'Today\'s entry level computers allow you to do software development. However, if you work on use powerful plugins in your IDE and/or want to do complex projects that require spinning up several components on your local development environment you will benefit from having a mid-level laptop or better.',
      postPath: '/docs/blog/',
      postFileName: 'recommended-hardware-specifications-for-java-and-typescript-development.md'
    },


  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
