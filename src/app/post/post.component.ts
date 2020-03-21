import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  content: SafeHtml;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private meta: Meta,
              private title: Title,
              private viewportScroller: ViewportScroller,
              private changeDetectorRef: ChangeDetectorRef,
              private backendService: BackendService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => this.http.get(`${this.backendService.getBaseURL()}/post/${p.name}`, { responseType: 'text' })
      .subscribe((data: string) => {
          this.meta.updateTag({ name: 'og:title', content: p.name });
          this.title.setTitle(p.name);
          this.content = this.sanitizer.bypassSecurityTrustHtml(data);
          this.changeDetectorRef.detectChanges();
          this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
        }
      ));
  }

  onClick(event) {
    const href = event.target.getAttribute('href');
    if (href) {
      if (href.startsWith('http')) {
        return;
      } else if (href.startsWith('#')) {
        this.router.navigateByUrl(`${this.router.url}${href}`);
        event.preventDefault();
      } else {
        this.router.navigateByUrl(href);
        event.preventDefault();
      }
    }
  }
}

