import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { BACKEND_BASE_URL } from '../config';
import { ViewportScroller } from '@angular/common';

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

              @Inject(BACKEND_BASE_URL) private baseUrl: string) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => this.http.get(`${this.baseUrl}/post/${p.name}`, { responseType: 'text' })
      .subscribe((data: string) => {
          this.meta.updateTag({ name: 'title', content: p.name });
          this.title.setTitle(p.name);
          this.content = this.sanitizer.bypassSecurityTrustHtml(data);
          this.changeDetectorRef.detectChanges();
          this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
        }
      ));
  }

  onClick(event) {
    const href = event.target.getAttribute('href');
    if (href && !(href.startsWith('http'))) {
      this.router.navigateByUrl(event.target.getAttribute('href'));
      event.preventDefault();
    }
  }
}

function replaceRelativeSrcs(text: string, baseUrl: string) {
  return text.replace(new RegExp(/src="(\.\/)/, 'g'), (match, group) => match.replace(group, baseUrl));
}

function replaceRelativeHrefs(text: string, route: ActivatedRoute) {
  const url = route.snapshot.url.map(segment => segment.path).slice(0, route.snapshot.url.length - 1).join('/');
  return text.replace(new RegExp(/href="(\.)\//, 'g'), (match, group) => match.replace(group, url));
}

function replaceAnchors(text: string, route: ActivatedRoute) {
  const url = route.snapshot.url.map(segment => segment.path).join('/');
  return text.replace(new RegExp('#ref-\\d*', 'g'), (match, hash) => url + match);
}


