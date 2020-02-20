import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_URL } from '../config';
import { ActivatedRoute, Router } from '@angular/router';

interface Post {
  title: string;
  path: string;
  children?: Post[];
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(BACKEND_BASE_URL) private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get(`${this.baseUrl}/posts/toc.json`)
      .subscribe((data: Post[]) => this.posts = data);
  }

  isActive(post: Post): boolean {
    return !!this.router.url.split('#')[0].split('/').find(p => post.path === p);
  }
}
