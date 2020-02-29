import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

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
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.http.get(`${this.backendService.getBaseURL()}/posts/toc.json`)
      .subscribe((data: Post[]) => this.posts = data);
  }

  isActive(post: Post): boolean {
    return !!this.router.url.split('#')[0].split('/').find(p => post.path === p);
  }
}
